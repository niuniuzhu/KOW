import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../ISnapshotable";
import { EAttr } from "../../Logic/Attribute";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 设置实体属性行为
 */
export class ActEntityAttrs extends EntityStateAction implements ISnapshotable {
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
		const owner = (<EntityState>this.state).owner;
		owner.SetAttr(attr, owner.GetAttr(attr) + value);
	}

	private DeactiveAttrs(): void {
		const owner = (<EntityState>this.state).owner;
		const count = this._attrs.length;
		for (let i = 0; i < count; ++i) {
			owner.SetAttr(this._attrs[i], owner.GetAttr(this._attrs[i]) - this._values[i]);
		}
	}
}