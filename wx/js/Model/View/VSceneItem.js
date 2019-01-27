import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";
export class VSceneItem extends VEntity {
    LoadCDef() {
        return CDefs.GetSceneItem(this._id);
    }
    AfterLoadCDef(cdefs) {
        this.DisplayRoot();
        this.animationProxy.Play(Hashtable.GetNumber(cdefs, "animation"), 0, 1, false);
    }
}
