import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VEntityStateAction } from "./VEntityStateAction";
import { Logger } from "../../../RC/Utils/Logger";

export class VActShake extends VEntityStateAction {
	protected OnInit(def: Hashtable): void {
		Logger.Log("ddd");
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		Logger.Log("enter");
	}
}