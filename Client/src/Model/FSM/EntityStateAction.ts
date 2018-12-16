import { FSMStateAction } from "../../RC/FSM/FSMStateAction";
import Decimal from "../../Libs/decimal";
import { EntityState } from "./EntityState";
import { Hashtable } from "../../RC/Utils/Hashtable";

export class EntityStateAction extends FSMStateAction {
	public readonly id: number;
	private _isTriggered: boolean;
	private _triggerTime: Decimal = new Decimal(0);

	constructor(state: EntityState, id: number, def: Hashtable) {
		super(state);
		this.id = id;
		this._triggerTime = new Decimal(Hashtable.GetNumber(def, "trigger_time"));
	}

	public Trigger(): void {
		this.OnTrigger();
	}

	protected OnTrigger(): void {
	}

	public Exit(): void {
		this._isTriggered = false;
		super.Exit();
	}

	public Update(dt: number | Decimal): void {
		const time = (<EntityState>this.state).time;
		if (time.greaterThanOrEqualTo(this._triggerTime)) {
			this._isTriggered = true;
		}
		if (!this._isTriggered) {
			return;
		}
		super.Update(dt);
	}
}