import Decimal from "../../Libs/decimal";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { DEFAULT_ATTR_VALUES, EAttr } from "../Attribute";
import { ISnapshotable } from "../ISnapshotable";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 设置实体属性行为
 */
export class ActEntityAttrs extends EntityStateAction implements ISnapshotable {
	protected OnTrigger(): void {
		super.OnTrigger();
		const attrs = Hashtable.GetArray(this._def, "attrs");
		const values = Hashtable.GetArray(this._def, "values");
		const count = attrs.length;
		for (let i = 0; i < count; ++i) {
			this.ActiveAttr(attrs[i], new Decimal(values[i]));
		}
	}

	protected OnExit(): void {
		this.DeactiveAttrs();
		super.OnExit();
	}

	private ActiveAttr(attr: EAttr, value: Decimal): void {
		const owner = (<EntityState>this.state).owner;
		owner.attribute.Set(attr, value);
	}

	private DeactiveAttrs(): void {
		const owner = (<EntityState>this.state).owner;
		const attrs = Hashtable.GetArray(this._def, "attrs");
		const count = attrs.length;
		for (let i = 0; i < count; ++i) {
			owner.attribute.Set(attrs[i], DEFAULT_ATTR_VALUES.get(attrs[i]));
		}
	}
}