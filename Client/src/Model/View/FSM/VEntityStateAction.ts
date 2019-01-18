import { FSMState } from "../../../RC/FSM/FSMState";
import { FSMStateAction } from "../../../RC/FSM/FSMStateAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VActionType } from "../../StateEnums";
import { VEntityState } from "./VEntityState";

export class VEntityStateAction extends FSMStateAction {
	private _triggerTime: number;
	private _isTriggered: boolean;

	constructor(state: FSMState, type: VActionType, def: Hashtable) {
		super(state, type);
		this.OnInit(def);
	}

	protected OnInit(def: Hashtable): void {
		this._triggerTime = Hashtable.GetNumber(def, "trigger_time");
	}

	protected OnEnter(param: any): void {
		this._isTriggered = false;
		if (this._triggerTime <= 0) {
			this.Trigger();
		}
	}

	public Update(dt: number): void {
		const time = (<VEntityState>this.state).time;
		if (!this._isTriggered) {
			if (time >= this._triggerTime) {
				this.Trigger();
			}
		}
		else
			super.Update(dt);
	}

	public Trigger(): void {
		this._isTriggered = true;
		this.OnTrigger();
	}

	protected OnTrigger(): void {
	}
}