import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 攻击行为
 */
export class ActAttack extends EntityStateAction implements ISnapshotable {
	protected OnTrigger():void{
		super.OnTrigger();
		const emitterID = Hashtable.GetNumber(this._def, "emitter");
	}
}