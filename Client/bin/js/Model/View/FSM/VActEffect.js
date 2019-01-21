define(["require", "exports", "../../../RC/Utils/Hashtable", "../../EntityType", "./VEntityStateAction", "../../../RC/Utils/Logger"], function (require, exports, Hashtable_1, EntityType_1, VEntityStateAction_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FxAttachType;
    (function (FxAttachType) {
        FxAttachType[FxAttachType["None"] = 0] = "None";
        FxAttachType[FxAttachType["Caster"] = 1] = "Caster";
    })(FxAttachType || (FxAttachType = {}));
    class VActEffect extends VEntityStateAction_1.VEntityStateAction {
        OnInit(def) {
            super.OnInit(def);
            this._effectID = Hashtable_1.Hashtable.GetNumber(def, "effect");
            this._offset = Hashtable_1.Hashtable.GetVec2(def, "offset");
            this._attachType = Hashtable_1.Hashtable.GetNumber(def, "attach_type");
            this._followPos = Hashtable_1.Hashtable.GetBool(def, "follow_pos");
            this._followRot = Hashtable_1.Hashtable.GetBool(def, "follow_rot");
            this._alwaysFollow = Hashtable_1.Hashtable.GetBool(def, "always_follow");
        }
        OnExit() {
            super.OnExit();
            this._fx = null;
        }
        OnTrigger() {
            super.OnTrigger();
            switch (this._attachType) {
                case FxAttachType.Caster:
                    const owner = this.state.owner;
                    this._fx = owner.battle.SpawnEffect(this._effectID);
                    this._fx.SetTarget(EntityType_1.EntityType.Champion, owner.rid, this._offset, this._followPos, this._followRot, this._alwaysFollow);
                    break;
                default:
                    Logger_1.Logger.Error(`attach type:${this._attachType} not supported`);
                    break;
            }
        }
    }
    exports.VActEffect = VActEffect;
});
//# sourceMappingURL=VActEffect.js.map