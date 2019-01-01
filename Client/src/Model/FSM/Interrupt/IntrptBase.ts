import * as $protobuf from "../../../Libs/protobufjs";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { InputType } from "../../Logic/InputAagent";
import { EntityState } from "../EntityState";
import { StateType } from "../StateEnums";

export abstract class IntrptBase implements ISnapshotable {
	public get id(): number { return this._id; }
	/**
	 * 获取总运行时间
	 */
	public get time(): number { return this._state.time; }
	/**
	 * 获取从开始到中断所使用的时间(如果延时为零,则和time一样)
	 */
	public get intrptTime(): number { return this._state.time - this._delay; }

	private _id: number;
	/**
	 * 所属状态
	 */
	protected _state: EntityState;
	/**
	 * 默认连接状态
	 */
	private _connectState: StateType = StateType.Idle;
	/**
	 * 延时
	 */
	private _delay: number = 0;
	/**
	 * 是否已触发
	 */
	private _isTriggered: boolean = false;

	constructor(state: EntityState, def: Hashtable) {
		this._state = state;
		this.OnInit(def);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.bool(this._isTriggered);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._isTriggered = reader.bool();
	}

	protected OnInit(def: Hashtable): void {
		this._id = Hashtable.GetNumber(def, "id");
		this._connectState = Hashtable.GetNumber(def, "connect_state");
		this._delay = Hashtable.GetNumber(def, "delay");
	}

	public Enter(): void {
		this._isTriggered = false;
		if (this._delay <= 0) {
			this.Trigger();
		}
		this.OnEnter();
	}

	public Exit(): void {
		this.OnExit();
	}

	public Update(dt: number): void {
		const time = this._state.time;
		if (!this._isTriggered) {
			if (time >= this._delay) {
				this.Trigger();
			}
		}
		else {
			this.OnUpdate(dt);
		}
	}

	public UpdatePhysic(dt: number): void {
		if (!this._isTriggered) {
			return;
		}
		this.OnUpdatePhysic(dt);
	}

	private Trigger(): void {
		this._isTriggered = true;
		this.OnTrigger();
	}

	protected OnTrigger(): void {
	}

	protected OnEnter(): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number): void {
	}

	protected OnUpdatePhysic(dt: number): void {
	}

	public HandleInput(type: InputType, press: boolean): void {
	}

	/**
	 * 转换状态
	 * @param igroneIntrptList 是否忽略中断列表
	 * @param force 是否强制转换
	 */
	protected ChangeState(igroneIntrptList: boolean = true, force: boolean = true): void {
		const state = (<EntityState>this._state);
		state.owner.fsm.ChangeState(this._connectState, this, igroneIntrptList, force);
	}

	public Dump(): string {
		let str = "";
		str += `istriggered:${this._isTriggered}\n`;
		return str;
	}
}