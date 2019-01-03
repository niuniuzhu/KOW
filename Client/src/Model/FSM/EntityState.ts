import * as $protobuf from "../../Libs/protobufjs";
import Set from "../../RC/Collections/Set";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { Champion } from "../Logic/Champion";
import { InputType } from "../Logic/InputAagent";
import { EntityStateAction } from "./EntityStateAction";
import { IntrptInput } from "./Interrupt/IntrptInput";
import { IntrptBase } from "./Interrupt/IntrptBase";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
import { ID_TO_STATE_ACTION, InterruptType, StateType } from "./StateEnums";
import { IntrptCollider } from "./Interrupt/IntrptCollider";

export class EntityState extends FSMState implements ISnapshotable {
	/**
	 * 所属实体
	 */
	public get owner(): Champion { return this._owner; }
	/**
	 * 获取或设置状态运行时间
	 */
	public time: number = 0;

	private readonly _interrupts: IntrptBase[] = [];
	private readonly _typeToIntrerrupt = new Map<number, IntrptBase>();
	private _statesAvailable: Set<StateType>;
	private _owner: Champion;

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

		//中断列表
		const interruptDefs = Hashtable.GetMapArray(def, "interrupts");
		if (interruptDefs) {
			for (const interruptDef of interruptDefs) {
				this.CreateInturrupt(interruptDef);
			}
		}
	}

	/**
	 * 创建中断实例
	 */
	private CreateInturrupt(def: Hashtable): void {
		const id = Hashtable.GetNumber(def, "id");
		let interrupt;
		switch (id) {
			case InterruptType.Timeup:
				interrupt = new IntrptTimeup(this, def);
				break;

			case InterruptType.Collision:
				interrupt = new IntrptCollider(this, def);
				break;

			case InterruptType.Input:
				interrupt = new IntrptInput(this, def);
				break;

		}
		this._interrupts.push(interrupt);
		this._typeToIntrerrupt.set(id, interrupt);
	}

	public RemoveInterrupt(type: number): boolean {
		const interrupt = this._typeToIntrerrupt.get(type);
		if (!interrupt == null)
			return false;
		this._typeToIntrerrupt.delete(type);
		this._interrupts.splice(this._interrupts.indexOf(interrupt), 1);
	}

	public GetInterrupt(id: number): IntrptBase {
		return this._typeToIntrerrupt.get(id);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this.time);
		for (const action of this._actions) {
			(<EntityStateAction>action).EncodeSnapshot(writer);
		}
		for (const interrupt of this._interrupts) {
			interrupt.EncodeSnapshot(writer);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this.time = reader.int32();
		for (const action of this._actions) {
			(<EntityStateAction>action).DecodeSnapshot(reader);
		}
		for (const interrupt of this._interrupts) {
			interrupt.DecodeSnapshot(reader);
		}
	}

	protected OnEnter(param: any): void {
		this.time = 0;
		for (const interrupt of this._interrupts) {
			interrupt.Enter();
		}
	}

	protected OnExit(): void {
		for (const interrupt of this._interrupts) {
			interrupt.Exit();
		}
	}

	protected OnUpdate(dt: number): void {
		for (const interrupt of this._interrupts) {
			interrupt.Update(dt);
		}
		this.time += dt;
	}

	public UpdatePhysic(dt: number): void {
		for (const action of this._actions) {
			(<EntityStateAction>action).UpdatePhysic(dt);
		}
		for (const interrupt of this._interrupts) {
			interrupt.UpdatePhysic(dt);
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

	public HandleInput(type: InputType, press: boolean): void {
		for (const action of this._actions) {
			(<EntityStateAction>action).HandlInput(type, press);
		}
		for (const interrupt of this._interrupts) {
			interrupt.HandleInput(type, press);
		}
	}

	public Dump(): string {
		let str = "";
		str += `interrupt count:${this._interrupts.length}\n`;
		for (const interrupt of this._interrupts) {
			str += interrupt.Dump();
		}
		str += `action count:${this._actions.length}\n`;
		for (const action of this._actions) {
			str += (<EntityStateAction>action).Dump();
		}
		str += `time:${this.time}\n`;
		return str;
	}
}