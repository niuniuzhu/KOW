import { FSMState } from "../../../RC/Framework/FSM/FSMState";
import { AbstractAction } from "../../../RC/Framework/Actions/AbstractAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { VActionType } from "../../StateEnums";
import { VEntityState } from "./VEntityState";
import { VChampion } from "../VChampion";

export class VEntityAction extends AbstractAction {
	/**
	 * 所属实体
	 */
	public get owner(): VChampion { return this._owner; }

	private _owner: VChampion;
	private _time: number;
	private _triggerTime: number;
	private _isTriggered: boolean;

	constructor(owner: VChampion, type: VActionType) {
		super(type);
		this._owner = owner;
	}

	public Init(def: Hashtable): void {
		this.OnInit(def);
	}

	protected OnInit(def: Hashtable): void {
		this._triggerTime = Hashtable.GetNumber(def, "trigger_time");
	}

	protected OnEnter(param: any): void {
		this._time = 0;
		this._isTriggered = false;
		if (this._triggerTime <= 0) {
			this.Trigger();
		}
	}

	public Update(dt: number): void {
		if (!this._isTriggered) {
			if (this._time >= this._triggerTime) {
				this.Trigger();
			}
		}
		else
			super.Update(dt);
		this._time += dt;
	}

	public Trigger(): void {
		this._isTriggered = true;
		this.OnTrigger();
	}

	protected OnTrigger(): void {
	}
}