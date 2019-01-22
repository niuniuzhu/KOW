import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";
export class VSceneItem extends VEntity {
    BeforeLoadDefs() {
        return CDefs.GetSceneItem(this._id);
    }
    AfterLoadDefs(cdefs) {
        this.DisplayRoot();
        this._animationProxy.Play(Hashtable.GetNumber(cdefs, "animation"), 0, 1, false);
    }
    DecodeSync(rid, reader, isNew) {
        super.DecodeSync(rid, reader, isNew);
    }
}
