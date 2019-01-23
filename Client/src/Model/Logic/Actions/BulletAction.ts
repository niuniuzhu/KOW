import { Hashtable } from "../../../RC/Utils/Hashtable";
import { BulletActionType } from "../../Defines";
import { EAttr } from "../Attribute";
import { Bullet } from "../Bullet";
import { Champion } from "../Champion";

/**
 * 过滤类型
 */
enum FilterType {
	AttrToAttr,//属性比较过滤
	AttrToValue,//属性与值比较过滤
	State//状态值比较
}

/**
 * 比较操作
 */
enum Op {
	Equal,
	NotEqual,
	Greater,
	GreaterEqual,
	Less,
	LessEqual
}

/**
 * 中断过滤定义
 */
class IntrptFilter {
	//属性中断
	public filterType: FilterType;
	public attr0: EAttr;
	public attr1: EAttr;
	public value: number;
	public op: Op;
}

/**
 * 各条件间的关系
 */
enum FilterRel {
	And,
	Or
}

/**
 * 子弹行为的触发阶段
 */
export enum BulletActionPhase {
	Create = 1 << 0,
	Collision = 1 << 1,
	Destroy = 1 << 2
}

/**
 * 子弹行为
 */
export abstract class BulletAction {
	/**
	 * 类型
	 */
	public get type(): BulletActionType { return this._type; }
	/**
	 * 所属实体
	 */
	public get owner(): Bullet { return this._owner; }

	private _type: BulletActionType;
	private _owner: Bullet;
	protected _phase: BulletActionPhase;
	/**
	 * 条件过滤
	 */
	private _intrptFilters: IntrptFilter[];
	/**
	 * 各过滤器间的关系
	 */
	private _rel: FilterRel;

	constructor(owner: Bullet, type: BulletActionType) {
		this._owner = owner;
		this._type = type;
	}

	public Init(def: Hashtable): void {
		this.OnInit(def);
	}

	protected OnInit(def: Hashtable): void {
		this._phase = Hashtable.GetNumber(def, "phase");
		const filterDefs = Hashtable.GetMapArray(def, "intrpt_filters");
		if (filterDefs != null && filterDefs.length > 0) {
			this._intrptFilters = [];
			for (const filterDef of filterDefs) {
				const intrptFilter = new IntrptFilter();
				intrptFilter.filterType = Hashtable.GetNumber(filterDef, "type");
				intrptFilter.attr0 = Hashtable.GetNumber(filterDef, "attr0");
				intrptFilter.attr1 = Hashtable.GetNumber(filterDef, "attr1");
				intrptFilter.value = Hashtable.GetNumber(filterDef, "value");
				intrptFilter.op = Hashtable.GetNumber(filterDef, "op");
				this._intrptFilters.push(intrptFilter);
			}
		}
		this._rel = Hashtable.GetNumber(def, "rel");
	}

	/**
	 * 子弹产生时调用
	 */
	public BulletCreated(): void {
		if ((this._phase & BulletActionPhase.Create) == 0) {
			return;
		}
		this.OnBulletCreated();
	}

	/**
	 * 子弹碰撞时调用
	 */
	public BulletCollision(target: Champion): void {
		if ((this._phase & BulletActionPhase.Collision) == 0) {
			return;
		}
		if (!this.CheckFilter(target)) {
			return;
		}
		this.OnBulletCollision(target);
	}

	/**
	 * 子弹销毁时调用
	 */
	public BulletDestroy(): void {
		if ((this._phase & BulletActionPhase.Destroy) == 0) {
			return;
		}
		this.OnBulletDestroy();
	}

	protected OnBulletCreated(): void {
	}

	protected OnBulletCollision(target: Champion): void {
	}

	protected OnBulletDestroy(): void {
	}

	/**
	 * 检查过滤条件
	 */
	protected CheckFilter(target: Champion): boolean {
		if (this._intrptFilters == null || this._intrptFilters.length == 0) {
			return true;
		}
		let result: boolean = this._rel == FilterRel.And ? true : false;
		for (const intrptFilter of this._intrptFilters) {
			let v0: number;
			let v1: number;
			let meet: boolean;
			switch (intrptFilter.filterType) {
				case FilterType.AttrToAttr://两属性值比较
					v0 = target.GetAttr(intrptFilter.attr0);
					v1 = target.GetAttr(intrptFilter.attr1);
					break;

				case FilterType.AttrToValue://属性值与给定值比较
					v0 = target.GetAttr(intrptFilter.attr0);
					v1 = intrptFilter.value;
					break;

				case FilterType.State://状态比较
					v0 = target.fsm.currentEntityState.type;
					v1 = intrptFilter.value;
					break;
			}
			switch (intrptFilter.op) {
				case Op.Equal:
					meet = v0 == v1;
					break;

				case Op.NotEqual:
					meet = v0 != v1;
					break;

				case Op.Greater:
					meet = v0 > v1;
					break;

				case Op.GreaterEqual:
					meet = v0 >= v1;
					break;

				case Op.Less:
					meet = v0 < v1;
					break;

				case Op.LessEqual:
					meet = v0 <= v1;
					break;
			}
			result = this._rel == FilterRel.And ? result && meet : result || meet;
		}
		return result;
	}
}