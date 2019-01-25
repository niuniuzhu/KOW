import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";

export class VSceneItem extends VEntity {
	protected LoadCDef(): Hashtable {
		return CDefs.GetSceneItem(this._id);
	}

	protected AfterLoadCDef(cdefs: Hashtable): void {
		this.DisplayRoot();
		this._animationProxy.Play(Hashtable.GetNumber(cdefs, "animation"), 0, 1, false);
	}
}