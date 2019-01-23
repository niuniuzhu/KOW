import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../ISnapshotable";
import { EAttr } from "../Attribute";
import { EntityAction } from "./EntityAction";
import { FMathUtils } from "../../../RC/FMath/FMathUtils";

/**
 * 设置实体属性
 */
export class ActChangeAttrs extends EntityAction implements ISnapshotable {
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
			this.owner.SetAttr(this._attrs[i], FMathUtils.Add(this.owner.GetAttr(this._attrs[i]), this._values[i]));
		}
	}

	protected OnExit(): void {
		this.DeactiveAttrs();
		super.OnExit();
	}

	private DeactiveAttrs(): void {
		const count = this._attrs.length;
		for (let i = 0; i < count; ++i) {
			this.owner.SetAttr(this._attrs[i], FMathUtils.Sub(this.owner.GetAttr(this._attrs[i]), this._values[i]));
		}
	}
}