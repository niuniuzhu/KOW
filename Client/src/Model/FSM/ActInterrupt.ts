import Decimal from "../../Libs/decimal";
import { FSMState } from "../../RC/FSM/FSMState";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
import { IntrptBase } from "./Interrupt/IntrptBase";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";

export enum InterruptType {
	Timeup,//指定时间
	Collision,//碰撞
}

/**
 * 中断状态
 */
export class ActInterrupt extends EntityStateAction {
	private readonly _interrupts: IntrptBase[] = [];

	constructor(state: FSMState, id: number, def: Hashtable) {
		super(state, id, def);
		const interruptDefs = Hashtable.GetMapArray(def, "interrupts");
		for (const interruptDef of interruptDefs) {
			this.CreateInturrupt(interruptDef);
		}
	}

	protected OnUpdate(dt: Decimal): void {
		for (const interrupt of this._interrupts) {
			interrupt.Update(dt);
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
}