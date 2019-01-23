import { FMathUtils } from "../../../RC/FMath/FMathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EAttr } from "../Attribute";
import { Champion } from "../Champion";
import { BulletAction, BulletActionPhase } from "./BulletAction";

/**
 * 操作
 */
enum Op {
	Equal,
	Add,
	Mul
}

/**
 * 设置目标属性
 */
export class ActBulletChangeAttrs extends BulletAction {
	private _attrs: EAttr[];
	private _values: number[];
	private _ops: Op[];

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		//强制设置在碰撞阶段
		this._phase = BulletActionPhase.Collision;
		this._attrs = Hashtable.GetNumberArray(def, "attrs");
		this._values = Hashtable.GetNumberArray(def, "values");
		this._ops = Hashtable.GetNumberArray(def, "ops");
	}

	protected OnBulletCollision(target: Champion): void {
		const count = this._attrs.length;
		for (let i = 0; i < count; ++i) {
			switch (this._ops[i]) {
				case Op.Equal:
					target.SetAttr(this._attrs[i], this._values[i]);
					break;
				case Op.Add:
					target.SetAttr(this._attrs[i], FMathUtils.Add(target.GetAttr(this._attrs[i]), this._values[i]));
					break;
				case Op.Mul:
					target.SetAttr(this._attrs[i], FMathUtils.Mul(target.GetAttr(this._attrs[i]), this._values[i]));
					break;
			}
		}
	}
}