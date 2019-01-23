import * as $protobuf from "../../../Libs/protobufjs";
import Set from "../../../RC/Collections/Set";
import { FSMState } from "../../../RC/Framework/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ID_TO_STATE_ACTION, StateType } from "../../StateEnums";
import { EntityAction } from "../Actions/EntityAction";
import { Champion } from "../Champion";
import { InputType } from "../InputAagent";
import { ISnapshotable } from "../ISnapshotable";

export class EntityState extends FSMState implements ISnapshotable {
	/**
	 * 所属实体
	 */
	public get owner(): Champion { return this._owner; }
	/**
	 * 获取状态运行时间
	 */
	public get time(): number { return this._time; }

	private _time: number = 0;
	private _statesAvailable: Set<StateType>;
	private _owner: Champion;

	constructor(type: number, owner: Champion) {
		super(type);
		this._owner = owner;
	}

	public Init(def: Hashtable): void {
		//初始化状态行为
		const actionsDef = Hashtable.GetMapArray(def, "actions");
		if (actionsDef != null) {
			for (const actionDef of actionsDef) {
				const type = Hashtable.GetNumber(actionDef, "id");
				const ctr = ID_TO_STATE_ACTION.get(type);
				const action = new ctr(this._owner, type);
				action.Init(actionDef);
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
		writer.int32(this._time);
		for (const action of this._actions) {
			(<EntityAction>action).EncodeSnapshot(writer);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._time = reader.int32();
		for (const action of this._actions) {
			(<EntityAction>action).DecodeSnapshot(reader);
		}
	}

	protected OnEnter(param: any): void {
		this._time = 0;
	}

	protected OnUpdate(dt: number): void {
		this._time += dt;
	}

	public UpdatePhysic(dt: number): void {
		for (const action of this._actions) {
			(<EntityAction>action).UpdatePhysic(dt);
		}
	}

	public HandleInput(type: InputType, press: boolean): void {
		for (const action of this._actions) {
			(<EntityAction>action).HandlInput(type, press);
		}
	}

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
			str += (<EntityAction>action).Dump();
		}
		str += `_time:${this._time}\n`;
		return str;
	}
}