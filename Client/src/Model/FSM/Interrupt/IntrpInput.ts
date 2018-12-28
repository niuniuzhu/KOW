import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { InputType } from "../../Logic/InputAagent";
import { EntityState } from "../EntityState";
import { IntrptBase } from "./IntrptBase";

enum InputTriggerType {
	Press,
	Release,
	Hold
}

/**
 * 按键中断
 */
export class IntrpInput extends IntrptBase implements ISnapshotable {
	/**
	 * 按键标记
	 */
	private _inputTypes: number[];
	/**
	 * 是否按下触发
	 */
	private _triggerTypes: InputTriggerType[];
	/**
	 * 是否全部满足
	 */
	private _and: boolean;

	constructor(action: EntityState, def: Hashtable) {
		super(action, def);
		this._inputTypes = Hashtable.GetNumberArray(def, "input_types");
		this._triggerTypes = Hashtable.GetNumberArray(def, "trigger_types");
		this._and = Hashtable.GetBool(def, "and");
	}

	public Update(dt: number): void {
		for (let i = 0; i < this._inputTypes.length; ++i) {
			const inputType = this._inputTypes[i];
			const triggerType = this._triggerTypes[i];
			if (triggerType != InputTriggerType.Hold)
				continue;
			const inputAgent = (<EntityState>this._state).owner.inputAgent;
			//检测按键是否按下状态
			if (inputAgent.GetInputState(inputType)) {
				this.ChangeState(this._connectState, null, true, true);
			}
		}
	}

	public HandleInput(type: InputType, press: boolean): void {
		let meet = false;
		if (this._and) {
			for (let i = 0; i < this._inputTypes.length; ++i) {
				const inputType = this._inputTypes[i];
				const triggerType = this._triggerTypes[i];
				if (inputType == type) {
					if (press) {
						if (triggerType != InputTriggerType.Press) {
							meet = false;
						}
					}
					else {
						if (triggerType != InputTriggerType.Release) {
							meet = false;
						}
					}
					break;
				}
			}
		}
		else {
			for (let i = 0; i < this._inputTypes.length; ++i) {
				const type1 = this._inputTypes[i];
				const press1 = this._triggerTypes[i];
				if (type1 == type) {
					if ((press && press1 == InputTriggerType.Press) || (!press && press1 == InputTriggerType.Release)) {
						meet = true;
					}
					break;
				}
			}
		}
		if (meet) {
			this.ChangeState(this._connectState, null, true, true);
		}
	}
}