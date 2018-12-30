import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { EntityState } from "../EntityState";
import { IntrptBase } from "./IntrptBase";

/**
 * 指定时间到达时中断
 */
export class IntrptTimeup extends IntrptBase implements ISnapshotable {
	/**
	 * 状态持续时长
	 */
	private _duration: number;

	protected OnInit(def: Hashtable) {
		super.OnInit(def);
		this._duration = Hashtable.GetNumber(def, "duration", -1);
	}

	protected OnUpdate(dt: number): void {
		const state = (<EntityState>this._state);
		if (this._duration >= 0 &&
			state.time >= this._duration) {
			this.ChangeState(true, true);
		}
	}
}