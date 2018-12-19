import { EntityStateAction } from "./EntityStateAction";
import { ISnapshotable } from "../ISnapshotable";
import { FSMState } from "../../RC/FSM/FSMState";
import { ActionType } from "./StateEnums";
import { Hashtable } from "../../RC/Utils/Hashtable";

/**
 * 攻击行为
 */
export class ActAttack extends EntityStateAction implements ISnapshotable {
	protected OnTrigger():void{
		super.OnTrigger();
		const emitterID = Hashtable.GetNumber(this._def, "emitter");
	}
}