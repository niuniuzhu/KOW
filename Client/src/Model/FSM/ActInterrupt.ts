import * as $protobuf from "../../Libs/protobufjs";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { InputType } from "../Logic/InputAagent";
import { EntityStateAction } from "./EntityStateAction";
import { IntrpInput } from "./Interrupt/IntrpInput";
import { IntrptBase } from "./Interrupt/IntrptBase";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";
import { ActionType, InterruptType } from "./StateEnums";

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
		let interrupt;
		switch (id) {
			case InterruptType.Timeup:
				interrupt = new IntrptTimeup(this, def);
				break;

			case InterruptType.Collision:
				//todo
				break;

			case InterruptType.Input:
				interrupt = new IntrpInput(this, def);
				break;

		}
		this._interrupts.push(interrupt);
	}

	protected OnUpdate(dt: number): void {
		for (const interrupt of this._interrupts) {
			interrupt.Update(dt);
		}
		super.OnUpdate(dt);
	}

	public HandlInput(type: InputType, press: boolean): void {
		for (const interrupt of this._interrupts) {
			interrupt.HandleInput(type, press);
		}
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