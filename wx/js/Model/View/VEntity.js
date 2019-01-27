import { Consts } from "../../Consts";
import { Global } from "../../Global";
import { ModelLayer } from "../../Graphic";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { AnimationProxy } from "./AnimationProxy";
import { Shaker } from "./Shaker";
export class VEntity {
    constructor(battle) {
        this._root = new fairygui.GComponent();
        this._animationProxy = null;
        this._position = Vec2.zero;
        this._worldPosition = Vec2.zero;
        this._rotation = 0;
        this._logicPos = Vec2.zero;
        this._logicRot = 0;
        this._battle = battle;
        this._root.setSize(0, 0);
        this._root.setPivot(0.5, 0.5, true);
    }
    get rid() { return this._rid; }
    get id() { return this._id; }
    get battle() { return this._battle; }
    get root() { return this._root; }
    get animationProxy() { return this._animationProxy; }
    get markToDestroy() { return this._markToDestroy; }
    set markToDestroy(value) { this._markToDestroy = value; }
    get position() { return this._position; }
    set position(value) {
        if (this._position.EqualsTo(value))
            return;
        const delta = Vec2.Sub(value, this._position);
        this._position.CopyFrom(value);
        this.OnPositionChanged(delta);
    }
    get rotation() { return this._rotation; }
    set rotation(value) {
        if (this._rotation == value)
            return;
        const delta = value - this._rotation;
        this._rotation = value;
        this.OnRatationChanged(delta);
    }
    get worldPosition() { return this._worldPosition; }
    Destroy() {
        if (this._animationProxy != null) {
            this._animationProxy.dispose();
            this._animationProxy = null;
        }
        this._root.dispose();
    }
    LoadDefs() {
        const defs = this.LoadDef();
        this.AfterLoadDef(defs);
        const cdefs = this.LoadCDef();
        this._modelLevel = Hashtable.GetNumber(cdefs, "model_layer");
        this._pivot = Hashtable.GetVec2(cdefs, "pivot") || new Vec2(0.5, 0.5);
        const modelID = Hashtable.GetNumber(cdefs, "model", -1);
        if (modelID >= 0) {
            this._animationProxy = new AnimationProxy(this, modelID);
            this._animationProxy.setPivot(this._pivot.x, this._pivot.y);
            this._root.addChild(this._animationProxy);
        }
        this.AfterLoadCDef(cdefs);
    }
    LoadDef() {
        return null;
    }
    AfterLoadDef(defs) {
    }
    LoadCDef() {
        return null;
    }
    AfterLoadCDef(cdefs) {
    }
    DisplayRoot() {
        switch (this._modelLevel) {
            case ModelLayer.EntityLow:
                Global.graphic.entityLow.addChild(this._root);
                break;
            case ModelLayer.EntityHigh:
                Global.graphic.entityHigh.addChild(this._root);
                break;
            case ModelLayer.EffectLow:
                Global.graphic.lowEffectRoot.addChild(this._root);
                break;
            case ModelLayer.EffectHigh:
                Global.graphic.highEffectRoot.addChild(this._root);
                break;
        }
    }
    DecodeSync(rid, reader, isNew) {
        this._rid = rid;
        this._id = reader.int32();
        if (isNew) {
            this.LoadDefs();
        }
        this._markToDestroy = reader.bool();
        this._logicPos = new Vec2(reader.double() * Consts.LOGIC_TO_PIXEL_RATIO, reader.double() * Consts.LOGIC_TO_PIXEL_RATIO);
        const logicDir = new Vec2(reader.double(), reader.double());
        this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(Vec2.down)));
        if (logicDir.x < 0) {
            this._logicRot = 360 - this._logicRot;
        }
        if (isNew) {
            this.position = this._logicPos.Clone();
            this.rotation = this._logicRot;
        }
    }
    Update(dt) {
        this.position = Vec2.Lerp(this._position, this._logicPos, 0.012 * dt);
        this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.015);
        if (this._shaker != null) {
            this._shaker.Update(dt);
        }
    }
    OnPositionChanged(delta) {
        this._root.setXY(this._position.x, this._position.y);
        let point = new Laya.Point();
        this._root.localToGlobal(0, 0, point);
        this._worldPosition.Set(point.x, point.y);
    }
    OnRatationChanged(delta) {
        this._root.rotation = this._rotation;
    }
    Shake(amplitude, frequency, damping, duration) {
        this._shaker = new Shaker(this._animationProxy.x, this._animationProxy.y, amplitude, frequency, damping, duration, true);
        this._shaker.onUpdate = (x, y) => {
            this._animationProxy.x = x;
            this._animationProxy.y = y;
        };
        this._shaker.onComplete = () => this._shaker = null;
        return this._shaker;
    }
}
