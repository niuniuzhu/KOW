import Decimal from "../../Libs/decimal";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EAttr } from "../Attribute";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";
import { StateOp } from "./StateEnums";

/**
 * 设置实体属性行为
 */
export class ActEntityAttrs extends EntityStateAction {
	private readonly _deltaAttrs: Map<EAttr, Decimal> = new Map<EAttr, Decimal>();

	constructor(state: EntityState, id: number, def: Hashtable) {
		super(state, id, def);
		const attrs = Hashtable.GetArray(def, "attrs");
		const ops = Hashtable.GetArray(def, "ops");
		const values = Hashtable.GetArray(def, "values");
		const count = attrs.length;
		for (let i = 0; i < count; ++i) {
			this.ActiveAttr(attrs[i], ops[i], new Decimal(values[i]));
		}
	}

	protected OnExit(): void {
		this.DeactiveAttrs();
		this._deltaAttrs.clear();
	}

	private ActiveAttr(attr: EAttr, op: StateOp, value: Decimal): any {
		const owner = (<EntityState>this.state).owner;
		const oldValue = owner.attribute.Get(attr);
		switch (op) {
			case StateOp.Equal:
				owner.attribute.Set(attr, value);
				break;
			case StateOp.Add:
				owner.attribute.Add(attr, value);
				break;
			case StateOp.Mul:
				owner.attribute.Mul(attr, value);
				break;
			case StateOp.Mod:
				owner.attribute.Mod(attr, value);
				break;
			case StateOp.Pow:
				owner.attribute.Pow(attr, value);
				break;
			case StateOp.Exp:
				owner.attribute.Exp(attr);
				break;
		}
		let delta = value.sub(oldValue);
		if (this._deltaAttrs.has(attr))
			delta = delta.add(this._deltaAttrs.get(attr));
		this._deltaAttrs.set(attr, delta);
	}

	private DeactiveAttrs(): void {
		const owner = (<EntityState>this.state).owner;
		this._deltaAttrs.forEach((delta, attr, _) => {
			const curValue = owner.attribute.Get(attr);
			owner.attribute.Set(attr, curValue.sub(delta));
		})
	}
}