import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { InputType } from "../InputAagent";
import { EntityState } from "../FSM/EntityState";
import { ActIntrptBase } from "./ActIntrptBase";

enum InputTriggerType {
	Press,
	Release,
	Hold
}

/**
 * 按键中断
 */
export class ActIntrptInput extends ActIntrptBase implements ISnapshotable {
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

	protected OnInit(def: Hashtable) {
		super.OnInit(def);
		this._inputTypes = Hashtable.GetNumberArray(def, "input_types");
		this._triggerTypes = Hashtable.GetNumberArray(def, "trigger_types");
		this._and = Hashtable.GetBool(def, "and");
	}

	protected OnUpdate(dt: number): void {
		for (let i = 0; i < this._inputTypes.length; ++i) {
			const inputType = this._inputTypes[i];
			const triggerType = this._triggerTypes[i];
			if (triggerType != InputTriggerType.Hold)
				continue;
			//检测按键是否按下状态
			if (this.owner.inputAgent.GetInputState(inputType) && this.CheckFilter()) {
				this.ChangeState();
			}
		}
	}

	protected OnInput(type: InputType, press: boolean): void {
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
		if (meet && this.CheckFilter()) {
			this.ChangeState();
		}
	}
}