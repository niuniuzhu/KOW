import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { ActionType } from "../../StateEnums";
import { ActIntrptTimeup } from "./ActIntrptTimeup";
import { ISnapshotable } from "../ISnapshotable";
import { ActVelocity } from "./ActVelocity";

export class ActSprint extends ActVelocity implements ISnapshotable {
	private _formula: string;
	private readonly _ee: ExpressionEvaluator = new ExpressionEvaluator();

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._formula = Hashtable.GetString(def, "formula", null);
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);

		//获取上一状态的持续时间
		const lastDuration = this.owner.fsm.previousEntityState.time;
		const formula = StringUtils.Format(this._formula, "" + lastDuration);
		const intrpt = <ActIntrptTimeup>this.owner.fsm.currentEntityState.GetAction(ActionType.Timeup);
		intrpt.duration = this._ee.evaluate(formula);
		this.owner.fsm.context.shakeTime = lastDuration;
	}
}