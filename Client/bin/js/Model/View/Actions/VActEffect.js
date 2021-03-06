define(["require", "exports", "../../../RC/Math/Vec2", "../../../RC/Utils/Hashtable", "../../EntityType", "./VEntityAction"], function (require, exports, Vec2_1, Hashtable_1, EntityType_1, VEntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FxAttachType;
    (function (FxAttachType) {
        FxAttachType[FxAttachType["None"] = 0] = "None";
        FxAttachType[FxAttachType["Caster"] = 1] = "Caster";
    })(FxAttachType || (FxAttachType = {}));
    var FxDestroyType;
    (function (FxDestroyType) {
        FxDestroyType[FxDestroyType["Effect"] = 0] = "Effect";
        FxDestroyType[FxDestroyType["State"] = 1] = "State";
    })(FxDestroyType || (FxDestroyType = {}));
    class VActEffect extends VEntityAction_1.VEntityAction {
        OnInit(def) {
            super.OnInit(def);
            this._effectID = Hashtable_1.Hashtable.GetNumber(def, "effect");
            this._offset = Hashtable_1.Hashtable.GetVec2(def, "offset") || Vec2_1.Vec2.zero;
            this._attachType = Hashtable_1.Hashtable.GetNumber(def, "attach_type");
            this._followPos = Hashtable_1.Hashtable.GetBool(def, "follow_pos");
            this._followRot = Hashtable_1.Hashtable.GetBool(def, "follow_rot");
            this._alwaysFollow = Hashtable_1.Hashtable.GetBool(def, "always_follow");
            this._destroyType = Hashtable_1.Hashtable.GetNumber(def, "destroy_type");
        }
        OnExit() {
            super.OnExit();
            if (this._fx != null) {
                if (this._destroyType == FxDestroyType.State) {
                    this._fx.markToDestroy = true;
                }
                this._fx = null;
            }
        }
        OnTrigger() {
            super.OnTrigger();
            this._fx = this.owner.battle.SpawnEffect(this._effectID);
            switch (this._attachType) {
                case FxAttachType.Caster:
                    this._fx.Set(this.owner.rid, this.owner.rid, EntityType_1.EntityType.Champion, this._offset, this._followPos, this._followRot, this._alwaysFollow);
                    break;
            }
            if (this._destroyType != FxDestroyType.Effect &&
                this._fx.lifeTime >= 0) {
                throw new Error(`fx:${this._fx.id}'s lifetime greater then zero, can only set destroy type to FxDestroyType.Effect`);
            }
        }
    }
    exports.VActEffect = VActEffect;
});
//# sourceMappingURL=VActEffect.js.map