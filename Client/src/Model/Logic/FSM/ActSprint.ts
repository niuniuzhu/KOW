import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { ISnapshotable } from "../../ISnapshotable";
import { ActVelocity } from "./ActVelocity";
import { EntityState } from "./EntityState";
import { IntrptTimeup } from "./Interrupt/IntrptTimeup";

export class ActSprint extends ActVelocity implements ISnapshotable {
	private _formula: string;
	private _ee: ExpressionEvaluator;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._formula = Hashtable.GetString(def, "formula");
		this._ee = new ExpressionEvaluator();
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);

		//获取上一状态的持续时间
		const lastDuration = (<EntityState>this.state).owner.fsm.previousEntityState.time;
		const formula = StringUtils.Format(this._formula, "" + lastDuration);
		const intrpt = <IntrptTimeup>(<EntityState>this.state).GetInterrupt(0);
		intrpt.duration = this._ee.evaluate(formula);
	}
}