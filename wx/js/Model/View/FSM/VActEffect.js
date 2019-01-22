import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityType } from "../../EntityType";
import { VEntityStateAction } from "./VEntityStateAction";
import { Logger } from "../../../RC/Utils/Logger";
var FxAttachType;
(function (FxAttachType) {
    FxAttachType[FxAttachType["None"] = 0] = "None";
    FxAttachType[FxAttachType["Caster"] = 1] = "Caster";
})(FxAttachType || (FxAttachType = {}));
export class VActEffect extends VEntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._effectID = Hashtable.GetNumber(def, "effect");
        this._offset = Hashtable.GetVec2(def, "offset");
        this._attachType = Hashtable.GetNumber(def, "attach_type");
        this._followPos = Hashtable.GetBool(def, "follow_pos");
        this._followRot = Hashtable.GetBool(def, "follow_rot");
        this._alwaysFollow = Hashtable.GetBool(def, "always_follow");
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
                this._fx.SetTarget(EntityType.Champion, owner.rid, this._offset, this._followPos, this._followRot, this._alwaysFollow);
                break;
            default:
                Logger.Error(`attach type:${this._attachType} not supported`);
                break;
        }
    }
}
