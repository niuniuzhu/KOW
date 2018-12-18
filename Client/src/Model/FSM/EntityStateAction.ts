import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FSMState } from "../../RC/FSM/FSMState";
import { FSMStateAction } from "../../RC/FSM/FSMStateAction";
import { MathUtils } from "../../RC/Math/MathUtils";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EntityState } from "./EntityState";
import { ActionType } from "./StateEnums";

export class EntityStateAction extends FSMStateAction implements ISnapshotable {
	protected readonly _def: Hashtable;

	private _triggerTime: Decimal = new Decimal(0);
	private _isTriggered: boolean;

	constructor(state: FSMState, type: ActionType, def: Hashtable) {
		super(state, type);
		this._def = def;
		this._triggerTime = new Decimal(Hashtable.GetNumber(this._def, "trigger_time"));
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.bool(this._isTriggered);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._isTriggered = reader.bool();
	}

	public Trigger(): void {
		this._isTriggered = true;
		this.OnTrigger();
	}

	protected OnTrigger(): void {
	}

	protected OnEnter(param: any): void {
		if (this._triggerTime.lessThanOrEqualTo(MathUtils.D_ZERO)) {
			this.Trigger();
		}
	}

	protected OnExit(): void {
		this._isTriggered = false;
	}

	public Update(dt: number | Decimal): void {
		const time = (<EntityState>this.state).time;
		if (!this._isTriggered) {
			if (time.greaterThanOrEqualTo(this._triggerTime)) {
				this.Trigger();
			}
		}
		else
			super.Update(dt);
	}

	/**
	 * 当状态时间改变时调用
	 * @param time 当前时间
	 */
	public OnStateTimeChanged(time: Decimal): void {
	}
}