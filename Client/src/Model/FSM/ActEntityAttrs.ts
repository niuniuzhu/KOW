import { Hashtable } from "../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EAttr } from "../Logic/Attribute";
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
			this.ActiveAttr(attrs[i], values[i]);
		}
	}

	protected OnExit(): void {
		this.DeactiveAttrs();
		super.OnExit();
	}

	private ActiveAttr(attr: EAttr, value: number): void {
		// const owner = (<EntityState>this.state).owner;
		// owner.attribute.Set(attr, value);
	}

	private DeactiveAttrs(): void {
		// const owner = (<EntityState>this.state).owner;
		// const attrs = Hashtable.GetArray(this._def, "attrs");
		// const count = attrs.length;
		// for (let i = 0; i < count; ++i) {
		// 	owner.attribute.Set(attrs[i], DEFAULT_ATTR_VALUES.get(attrs[i]));
		// }
	}
}