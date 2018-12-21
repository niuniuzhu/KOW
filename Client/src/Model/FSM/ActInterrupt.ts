import * as $protobuf from "../../Libs/protobufjs";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EntityStateAction } from "./EntityStateAction";
import { IntrptBase } from "./Interrupt/IntrptBase";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
import { ActionType } from "./StateEnums";

export enum InterruptType {
	Timeup,//指定时间
	Collision,//碰撞
}

/**
 * 中断状态
 */
export class ActInterrupt extends EntityStateAction implements ISnapshotable {
	private readonly _interrupts: IntrptBase[] = [];

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
		for (const interrupt of this._interrupts) {
			interrupt.EncodeSnapshot(writer);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
		for (const interrupt of this._interrupts) {
			interrupt.DecodeSnapshot(reader);
		}
	}

	constructor(state: FSMState, type: ActionType, def: Hashtable) {
		super(state, type, def);
		const interruptDefs = Hashtable.GetMapArray(this._def, "interrupts");
		for (const interruptDef of interruptDefs) {
			this.CreateInturrupt(interruptDef);
		}
	}

	/**
	 * 创建中断实例
	 */
	private CreateInturrupt(def: Hashtable): void {
		const id = Hashtable.GetNumber(def, "id");
		switch (id) {
			case InterruptType.Timeup:
				const interrupt = new IntrptTimeup(this, def);
				this._interrupts.push(interrupt);
				break;

			case InterruptType.Collision:
				//todo
				break;
		}
	}

	protected OnUpdate(dt: number): void {
		for (const interrupt of this._interrupts) {
			interrupt.Update(dt);
		}
		super.OnUpdate(dt);
	}

	public Dump(): string {
		let str = super.Dump();
		str += `interrupt count:${this._interrupts.length}\n`;
		for (const interrupt of this._interrupts) {
			str += interrupt.Dump();
		}
		return str;
	}
}