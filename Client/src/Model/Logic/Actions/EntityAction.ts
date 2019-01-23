import * as $protobuf from "../../../Libs/protobufjs";
import { AbstractAction } from "../../../RC/Framework/Actions/AbstractAction";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { ActionType } from "../../Defines";
import { InputType } from "../InputAagent";
import { Champion } from "../Champion";

export class EntityAction extends AbstractAction implements ISnapshotable {
	/**
	 * 所属实体
	 */
	public get owner(): Champion { return this._owner; }
	/**
	 * 获取总运行时间
	 */
	public get time(): number { return this._time; }
	/**
	 * 获取从触发到结束所使用的时间(如果触发时间为零,则和time一样)
	 */
	public get intrptTime(): number { return this._time - this._triggerTime; }

	private _owner: Champion;
	private _time: number;
	private _triggerTime: number;
	private _isTriggered: boolean;

	constructor(owner: Champion, type: ActionType) {
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
		else {
			super.Update(dt);
		}
		this._time += dt;
	}

	public UpdatePhysic(dt: number): void {
		if (!this._isTriggered) {
			return;
		}
		this.OnUpdatePhysic(dt);
	}

	protected OnUpdatePhysic(dt: number): void {
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
		this.OnInput(type, press);
	}

	protected OnInput(type: InputType, press: boolean): void {
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._time);
		writer.bool(this._isTriggered);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._time = reader.int32();
		this._isTriggered = reader.bool();
	}

	public Dump(): string {
		let str = "\t========";
		str += `\ttype:${this.type}\n`;
		str += `\tistriggered:${this._isTriggered}\n`;
		return str;
	}
}