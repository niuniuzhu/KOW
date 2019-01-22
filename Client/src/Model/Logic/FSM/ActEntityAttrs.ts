import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EAttr } from "../../Logic/Attribute";
import { EntityAction } from "./EntityAction";

/**
 * 设置实体属性行为
 */
export class ActEntityAttrs extends EntityAction implements ISnapshotable {
	private _attrs: EAttr[];
	private _values: number[];

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._attrs = Hashtable.GetNumberArray(def, "attrs");
		this._values = Hashtable.GetNumberArray(def, "values");
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		const count = this._attrs.length;
		for (let i = 0; i < count; ++i) {
			this.ActiveAttr(this._attrs[i], this._values[i]);
		}
	}

	protected OnExit(): void {
		this.DeactiveAttrs();
		super.OnExit();
	}

	private ActiveAttr(attr: EAttr, value: number): void {
		this.owner.SetAttr(attr, this.owner.GetAttr(attr) + value);
	}

	private DeactiveAttrs(): void {
		const count = this._attrs.length;
		for (let i = 0; i < count; ++i) {
			this.owner.SetAttr(this._attrs[i], this.owner.GetAttr(this._attrs[i]) - this._values[i]);
		}
	}
}