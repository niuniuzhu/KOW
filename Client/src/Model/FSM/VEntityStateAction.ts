import { FSMState } from "../../RC/FSM/FSMState";
import { FSMStateAction } from "../../RC/FSM/FSMStateAction";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { VActionType } from "./StateEnums";

export class VEntityStateAction extends FSMStateAction {
	constructor(state: FSMState, type: VActionType, def: Hashtable) {
		super(state, type);
		this.OnInit(def);
	}

	protected OnInit(def: Hashtable): void {
	}
}