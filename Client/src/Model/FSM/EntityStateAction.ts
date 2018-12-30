import * as $protobuf from "../../Libs/protobufjs";
import { FSMState } from "../../RC/FSM/FSMState";
import { FSMStateAction } from "../../RC/FSM/FSMStateAction";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { InputType } from "../Logic/InputAagent";
import { EntityState } from "./EntityState";
import { ActionType } from "./StateEnums";

export abstract class EntityStateAction extends FSMStateAction implements ISnapshotable {
	/**
	 * 获取总运行时间
	 */
	public get time(): number { return (<EntityState>this.state).time; }
	/**
	 * 获取从触发到结束所使用的时间(如果触发时间为零,则和time一样)
	 */
	public get intrptTime(): number { return (<EntityState>this.state).time - this._triggerTime; }

	private _triggerTime: number;
	private _isTriggered: boolean;

	constructor(state: FSMState, type: ActionType, def: Hashtable) {
		super(state, type);
		this.OnInit(def);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.bool(this._isTriggered);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._isTriggered = reader.bool();
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
		const time = (<EntityState>this.state).time;
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

	/**
	 * 处理输入指令
	 * @param inputFlag 输入标记
	 * @param press 是按下还是弹起
	 */
	public HandlInput(type: InputType, press: boolean): void {
	}

	public Dump(): string {
		let str = "";
		str += `istriggered:${this._isTriggered}\n`;
		return str;
	}
}