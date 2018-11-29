import { Consts } from "../../Consts";
import { CDefs } from "../CDefs";
import { Global } from "../../Global";
import { FSM } from "../../RC/FSM/FSM";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Attribute } from "../Attribute";
import { AniHolder } from "./AniHolder";
import { VEntityState } from "./FSM/VEntityState";
import { FVec2 } from "../../RC/FVec2";
import Decimal from "../../Libs/decimal";
import { Defs } from "../Defs";
export class VEntity {
    constructor() {
        this.attribute = new Attribute();
        this._position = FVec2.zero;
        this._worldPosition = FVec2.zero;
        this._rotation = 0;
        this._logicPos = FVec2.zero;
        this._logicRot = 0;
        this._playingName = "";
        this._fsm = new FSM();
        this._root = new fairygui.GComponent();
        this._animations = new Map();
        this._root.setSize(0, 0);
        this._root.setPivot(0.5, 0.5, true);
        Global.graphic.entityRoot.addChild(this._root);
        this._fsm.AddState(new VEntityState(VEntityState.Type.Idle, this));
        this._fsm.AddState(new VEntityState(VEntityState.Type.Move, this));
        this._fsm.AddState(new VEntityState(VEntityState.Type.Attack, this));
        this._fsm.AddState(new VEntityState(VEntityState.Type.Die, this));
    }
    get id() { return this._id; }
    get actorID() { return this._actorID; }
    get team() { return this._team; }
    get name() { return this._name; }
    get def() { return this._def; }
    get root() { return this._root; }
    get position() { return this._position; }
    set position(value) {
        if (this._position.EqualsTo(value))
            return;
        const delta = FVec2.Sub(value, this._position);
        this._position = value;
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
    Init(id, battle) {
        this._id = id;
        this._battle = battle;
    }
    Dispose() {
        this._animations.forEach((v, k, map) => {
            v.dispose();
        });
        this._animations.clear();
        this._root.dispose();
    }
    Update(dt) {
        this.position = FVec2.Lerp(this._position, this._logicPos, VEntity.D_SMALL0.mul(dt));
        this.rotation = MathUtils.LerpAngle(this._rotation, this._logicRot, dt * 0.018);
    }
    OnPositionChanged(delta) {
        this._root.setXY(this._position.x.toNumber(), this._position.y.toNumber());
        let point = new Laya.Point();
        this._root.localToGlobal(0, 0, point);
        this._worldPosition.x = new Decimal(point.x);
        this._worldPosition.y = new Decimal(point.y);
    }
    OnRatationChanged(delta) {
        this._root.rotation = this._rotation;
    }
    InitSnapshot(reader) {
        this._actorID = reader.int32();
        this._def = Defs.GetEntity(this._actorID);
        const aniDefs = Hashtable.GetMapArray(CDefs.GetEntity(this._actorID), "animations");
        for (let i = 0; i < aniDefs.length; ++i) {
            const aniDef = aniDefs[i];
            const aniName = Hashtable.GetString(aniDef, "name");
            const length = Hashtable.GetNumber(aniDef, "length");
            const urls = [];
            for (let i = 0; i < length; ++i) {
                urls.push((Consts.ASSETS_ENTITY_PREFIX + this._actorID) + "/" + aniName + i + ".png");
            }
            this._animations.set(aniName, new AniHolder(urls));
        }
        this._team = reader.int32();
        this._name = reader.string();
        this.position = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._logicPos.CopyFrom(this.position);
        const logicDir = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this.rotation = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(FVec2.down).toNumber()));
        if (logicDir.x.lessThan(MathUtils.D_ZERO))
            this.rotation = 360 - this.rotation;
        this._logicRot = this.rotation;
        const moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._fsm.ChangeState(reader.int32(), null);
        this._fsm.currentState.time = reader.int32();
        const count = reader.int32();
        for (let i = 0; i < count; i++) {
            this.attribute.Set(reader.int32(), new Decimal(reader.float()));
        }
    }
    DecodeSnapshot(reader) {
        this._actorID = reader.int32();
        this._team = reader.int32();
        this._name = reader.string();
        this._logicPos = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        const logicDir = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._logicRot = MathUtils.RadToDeg(MathUtils.Acos(logicDir.Dot(FVec2.down).toNumber()));
        if (logicDir.x.lessThan(MathUtils.D_ZERO))
            this._logicRot = 360 - this._logicRot;
        const moveDirection = new FVec2(new Decimal(reader.float()), new Decimal(reader.float()));
        this._fsm.ChangeState(reader.int32(), null);
        this._fsm.currentState.time = reader.int32();
        const count = reader.int32();
        for (let i = 0; i < count; i++) {
            this.attribute.Set(reader.int32(), new Decimal(reader.float()));
        }
    }
    PlayAnim(name, force = false) {
        if (!force && this._playingName == name)
            return;
        this._playingName = name;
        const aniHilder = this._animations.get(name);
        this._root.removeChildren();
        this._root.addChild(aniHilder);
        aniHilder.Play();
    }
}
VEntity.D_SMALL0 = new Decimal(0.012);
