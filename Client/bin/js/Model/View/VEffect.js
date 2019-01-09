define(["require", "exports", "../../Global", "../../RC/Math/Vec2", "../../RC/Utils/Hashtable", "../CDefs", "./AnimationProxy"], function (require, exports, Global_1, Vec2_1, Hashtable_1, CDefs_1, AnimationProxy_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EffectRootLevel;
    (function (EffectRootLevel) {
        EffectRootLevel[EffectRootLevel["Low"] = 0] = "Low";
        EffectRootLevel[EffectRootLevel["High"] = 1] = "High";
    })(EffectRootLevel || (EffectRootLevel = {}));
    class VEffect {
        constructor(battle, id) {
            this.markToDestroy = false;
            this._position = Vec2_1.Vec2.zero;
            this._worldPosition = Vec2_1.Vec2.zero;
            this._rotation = 0;
            this._root = new fairygui.GComponent();
            this._animationProxy = null;
            this._battle = battle;
            this._id = id;
            this.LoadDefs();
            this._root.setSize(0, 0);
            this._root.setPivot(0.5, 0.5, true);
            switch (this._effectRootLevel) {
                case EffectRootLevel.Low:
                    Global_1.Global.graphic.lowEffectRoot.addChild(this._root);
                    break;
                case EffectRootLevel.High:
                    Global_1.Global.graphic.highEffectRoot.addChild(this._root);
                    break;
            }
            this._animationProxy.Play(this._animationID, 0, 1, true);
        }
        get id() { return this._id; }
        get lifeTime() { return this._lifeTime; }
        get position() { return this._position; }
        set position(value) {
            if (this._position.EqualsTo(value))
                return;
            const delta = Vec2_1.Vec2.Sub(value, this._position);
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
            const cdefs = CDefs_1.CDefs.GetEffect(this._id);
            const modelID = Hashtable_1.Hashtable.GetNumber(cdefs, "model", -1);
            if (modelID >= 0) {
                this._animationProxy = new AnimationProxy_1.AnimationProxy(modelID);
            }
            this._effectRootLevel = Hashtable_1.Hashtable.GetNumber(cdefs, "layer");
            this._animationID = Hashtable_1.Hashtable.GetNumber(cdefs, "animation");
            const setting = this._animationProxy.GetSetting(this._animationID);
            this._lifeTime = setting.length * setting.interval;
        }
        Update(dt) {
            if (this._lifeTime >= 0 && this._time >= this._lifeTime) {
                this.markToDestroy = true;
            }
            if (!this.markToDestroy) {
                this._time += dt;
            }
        }
        OnSpawn() {
            this._root.addChild(this._animationProxy);
            this._time = 0;
            this.markToDestroy = false;
        }
        OnDespawn() {
            this._root.removeChild(this._animationProxy);
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
    }
    exports.VEffect = VEffect;
});
//# sourceMappingURL=VEffect.js.map