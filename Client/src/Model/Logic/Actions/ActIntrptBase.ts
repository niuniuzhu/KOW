import { Hashtable } from "../../../RC/Utils/Hashtable";
import { Logger } from "../../../RC/Utils/Logger";
import { StateType } from "../../StateEnums";
import { EntityAction } from "./EntityAction";
import { EAttr } from "../Attribute";
import { ISnapshotable } from "../ISnapshotable";

/**
 * 过滤类型
 */
enum FilterType {
	AttrToAttr,//属性比较过滤
	AttrToValue,//属性与值比较过滤
	State//状态值比较
}

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
	//技能中断
	public skillID: number;
}

enum FilterRel {
	And,
	Or
}

/**
 * 中断类型
 */
enum IntrptType {
	Attr,
	Skill,
	State
}

/**
 * 中断器
 */
export class ActIntrptBase extends EntityAction implements ISnapshotable {
	/**
	 * 中断类型
	 */
	private _intrptType: IntrptType;
	/**
	 * 连接状态
	 */
	private _connectState: StateType = StateType.Idle;
	/**
	 * 连接的技能ID
	 */
	private _skillID: number;
	/**
	 * 连接的技能ID(随机选择数组中其中一个)
	 */
	private _skillIDs: number[];
	/**
	 * 条件过滤
	 */
	private _intrptFilters: IntrptFilter[];
	/**
	 * 各过滤器间的关系
	 */
	private _rel: FilterRel;

	protected OnInit(def: Hashtable): void {
		super.OnInit(def);
		this._intrptType = Hashtable.GetNumber(def, "intrpt_type");
		this._connectState = Hashtable.GetNumber(def, "connect_state");
		this._skillID = Hashtable.GetNumber(def, "intrpt_skill", null);
		this._skillIDs = Hashtable.GetNumberArray(def, "intrpt_skills");
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
				intrptFilter.skillID = Hashtable.GetNumber(filterDef, "skill");
				this._intrptFilters.push(intrptFilter);
			}
		}
		this._rel = Hashtable.GetNumber(def, "rel");
	}

	/**
	 * 检查过滤条件
	 */
	protected CheckFilter(): boolean {
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
					v0 = this.owner.GetAttr(intrptFilter.attr0);
					v1 = this.owner.GetAttr(intrptFilter.attr1);
					break;

				case FilterType.AttrToValue://属性值与给定值比较
					v0 = this.owner.GetAttr(intrptFilter.attr0);
					v1 = intrptFilter.value;
					break;

				case FilterType.State://状态比较
					v0 = this.owner.fsm.currentEntityState.type;
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

	/**
	 * 转换状态
	 * @param igroneIntrptList 是否忽略中断列表
	 * @param force 是否强制转换
	 */
	protected ChangeState(igroneIntrptList: boolean = true, force: boolean = true): void {
		switch (this._intrptType) {
			case IntrptType.Attr://中断到状态
				this.owner.fsm.ChangeState(this._connectState, null, igroneIntrptList, force);
				break;

			case IntrptType.Skill://中断到技能
				let skill;
				if (this._skillID == null) {
					if (this._skillIDs == null || this._skillIDs.length == 0) {
						Logger.Warn("invalid skill id");
						return;
					}
					const index = this.owner.battle.random.NextFloor(0, this._skillIDs.length);
					skill = this.owner.GetSkill(this._skillIDs[index]);
				}
				else {
					skill = this.owner.GetSkill(this._skillID);
				}
				if (skill == null) {
					Logger.Warn("invalid skill");
					return;
				}
				const meet = this.owner.mp >= skill.mpCost;
				if (meet) {//成功使用技能
					//在上下文中记录技能id
					this.owner.fsm.context.skillID = skill.id;
					this.owner.fsm.ChangeState(skill.connectState, null, igroneIntrptList, force);
				}
				break;
		}
	}
}