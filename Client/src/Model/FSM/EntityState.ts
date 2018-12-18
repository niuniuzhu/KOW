import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import Set from "../../RC/Collections/Set";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { Entity } from "../Logic/Entity";
import { EntityStateAction } from "./EntityStateAction";
import { ID_TO_STATE_ACTION, StateType } from "./StateEnums";

export class EntityState extends FSMState implements ISnapshotable {
	/**
	 * 所属实体
	 */
	public get owner(): Entity { return this._owner; }
	/**
	 * 获取状态运行时间
	 */
	public get time(): Decimal { return this._time; }
	/**
	 * 设置状态运行时间
	 */
	public set time(value: Decimal) {
		if (this._time.equals(value))
			return;
		this._time = value;
		this.OnStateTimeChanged();
	}

	private _statesAvailable: Set<StateType>;
	private _owner: Entity;
	private _time: Decimal = new Decimal(0);

	constructor(type: number, owner: Entity) {
		super(type);
		this._owner = owner;
	}

	public Init(): void {
		const def = Hashtable.GetMap(Hashtable.GetMap(this._owner.def, "states"), this.type.toString());

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
		writer.float(this._time.toNumber());
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		for (const action of this._actions) {
			(<EntityStateAction>action).DecodeSnapshot(reader);
		}
		this._time = new Decimal(reader.float());
	}

	protected OnEnter(param: any): void {
		this._time = new Decimal(0);
	}

	protected OnUpdate(dt: Decimal): void {
		this._time = Decimal.add(this._time, dt);
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
}