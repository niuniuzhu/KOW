import { ExpressionEvaluator } from "../../../RC/Utils/ExpressionEvaluator";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { StringUtils } from "../../../RC/Utils/TextUtils";
import { VActEffect } from "./VActEffect";

export class VActShakeEffect extends VActEffect {
	private _formula: string;
	private readonly _ee: ExpressionEvaluator = new ExpressionEvaluator();

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._formula = Hashtable.GetString(def, "formula");
	}

	protected OnTrigger(): void {
		super.OnTrigger();
	}

	protected OnExit(): void {
		this._fx.root.setScale(1, 1);
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
		super.OnUpdate(dt);
		if (this._formula != null) {
			//获取上一状态的持续时间
			const result = StringUtils.Format(this._formula, "" + this.time);
			const distance = this._ee.evaluate(result) * 0.001;//s=vt
			this._fx.root.scaleY = distance;
		}
	}
}