define(["require", "exports", "../../../RC/Utils/Hashtable", "./VEntityStateAction"], function (require, exports, Hashtable_1, VEntityStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FxAttachType;
    (function (FxAttachType) {
        FxAttachType[FxAttachType["None"] = 0] = "None";
        FxAttachType[FxAttachType["Caster"] = 1] = "Caster";
    })(FxAttachType || (FxAttachType = {}));
    var PosRotType;
    (function (PosRotType) {
        PosRotType[PosRotType["None"] = 0] = "None";
        PosRotType[PosRotType["Position"] = 1] = "Position";
        PosRotType[PosRotType["Rotation"] = 2] = "Rotation";
    })(PosRotType || (PosRotType = {}));
    class VActEffect extends VEntityStateAction_1.VEntityStateAction {
        OnInit(def) {
            super.OnInit(def);
            this._effectID = Hashtable_1.Hashtable.GetNumber(def, "effect");
            this._attachType = Hashtable_1.Hashtable.GetNumber(def, "attach_type");
            this._posRotType = Hashtable_1.Hashtable.GetNumber(def, "posrot_type");
            this._followPos = Hashtable_1.Hashtable.GetBool(def, "follow_pos");
            this._followRot = Hashtable_1.Hashtable.GetBool(def, "follow_rot");
        }
        OnExit() {
            super.OnExit();
            this._fx = null;
        }
        OnTrigger() {
            super.OnTrigger();
            const owner = this.state.owner;
            this._fx = owner.battle.SpawnEffect(this._effectID);
            switch (this._attachType) {
                case FxAttachType.Caster:
                    if ((this._posRotType & PosRotType.Position) > 0) {
                        this._fx.position = owner.position;
                    }
                    if ((this._posRotType & PosRotType.Rotation) > 0) {
                        this._fx.rotation = owner.rotation;
                    }
                    break;
            }
        }
        OnUpdate(dt) {
            const owner = this.state.owner;
            if (this._followPos) {
                switch (this._attachType) {
                    case FxAttachType.Caster:
                        this._fx.position = owner.position;
                        break;
                }
            }
            if (this._followRot) {
                switch (this._attachType) {
                    case FxAttachType.Caster:
                        this._fx.rotation = owner.rotation;
                        break;
                }
            }
        }
    }
    exports.VActEffect = VActEffect;
});
//# sourceMappingURL=VActEffect.js.map