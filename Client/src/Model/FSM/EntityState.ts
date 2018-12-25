import * as $protobuf from "../../Libs/protobufjs";
import Set from "../../RC/Collections/Set";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { Champion } from "../Logic/Champion";
import { EntityStateAction } from "./EntityStateAction";
import { ID_TO_STATE_ACTION, StateType } from "./StateEnums";

export class EntityState extends FSMState implements ISnapshotable {
	/**
	 * 所属实体
	 */
	public get owner(): Champion { return this._owner; }
	/**
	 * 获取状态运行时间
	 */
	public get time(): number { return this._time; }
	/**
	 * 设置状态运行时间
	 */
	public set time(value: number) {
		if (this._time == value)
			return;
		this._time = value;
		this.OnStateTimeChanged();
	}

	private _statesAvailable: Set<StateType>;
	private _owner: Champion;
	private _time: number;

	constructor(type: number, owner: Champion) {
		super(type);
		this._owner = owner;
	}

	public Init(): void {
		const def = Hashtable.GetMap(Hashtable.GetMap(this._owner.defs, "states"), this.type.toString());

		//初始化状态行为
		const actionsDef = Hashtable.GetMapArray(def, "actions");
		if (actionsDef != null) {
			for (const actionDef of actionsDef) {
				const type = Hashtable.GetNumber(actionDef, "id");
				const ctr = ID_TO_STATE_ACTION.get(type);
				const action = new ctr(this, type, actionDef);
				this.AddAction(action);
			}
		}

		//能被中断的状态列表
		const sa = Hashtable.GetNumberArray(def, "states_available");
		if (sa != null) {
			this._statesAvailable = new Set<StateType>();
			for (const type of sa) {
				this._statesAvailable.add(type);
			}
		}
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		for (const action of this._actions) {
			(<EntityStateAction>action).EncodeSnapshot(writer);
		}
		writer.int32(this._time);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		for (const action of this._actions) {
			(<EntityStateAction>action).DecodeSnapshot(reader);
		}
		this._time = reader.int32();
	}

	protected OnEnter(param: any): void {
		this._time = 0;
	}

	protected OnUpdate(dt: number): void {
		this._time += dt;
	}

	protected OnStateTimeChanged(): void {
		for (const action of this._actions) {
			(<EntityStateAction>action).OnStateTimeChanged(this._time);
		}
	}

	//todo 处理状态属性加成

	/**
	 * 查询该状态下是否能转换到指定状态
	 * @param type 状态类型
	 */
	public IsStateAvailable(type: StateType): boolean {
		return this._statesAvailable == null || this._statesAvailable.contains(type);
	}

	public Dump(): string {
		let str = "";
		str += `action count:${this._actions.length}\n`;
		for (const action of this._actions) {
			str += (<EntityStateAction>action).Dump();
		}
		str += `time:${this._time}\n`;
		return str;
	}
}