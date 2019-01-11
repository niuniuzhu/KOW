import * as $protobuf from "../../../../Libs/protobufjs";
import { Hashtable } from "../../../../RC/Utils/Hashtable";
import { ISnapshotable } from "../../../ISnapshotable";
import { InputType } from "../../../Logic/InputAagent";
import { EntityState } from "../EntityState";
import { StateType } from "../../../StateEnums";
import { EAttr } from "../../Attribute";
import { FMathUtils } from "../../../../RC/FMath/FMathUtils";

/**
 * 过滤类型
 */
enum FilterType {
	AttrToAttr,//属性比较过滤
	AttrToValue//属性与值比较过滤
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
	public filterType: FilterType;
	public attr0: EAttr;
	public attr1: EAttr;
	public value: number;
	public op: Op;
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
	State,
	Skill
}

/**
 * 中断器
 */
export abstract class IntrptBase implements ISnapshotable {
	public get id(): number { return this._id; }
	/**
	 * 获取总运行时间
	 */
	public get time(): number { return this._state.time; }
	/**
	 * 获取从开始到中断所使用的时间(如果延时为零,则和time一样)
	 */
	public get intrptTime(): number { return this._state.time - this._delay; }

	private _id: number;
	/**
	 * 所属状态
	 */
	protected _state: EntityState;
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
	 * 延时
	 */
	private _delay: number = 0;
	/**
	 * 是否已触发
	 */
	private _isTriggered: boolean = false;
	/**
	 * 条件过滤
	 */
	private readonly _intrptFilters: IntrptFilter[] = [];
	/**
	 * 各过滤器间的关系
	 */
	private _rel: FilterRel;

	constructor(state: EntityState, def: Hashtable) {
		this._state = state;
		this.OnInit(def);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.bool(this._isTriggered);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._isTriggered = reader.bool();
	}

	protected OnInit(def: Hashtable): void {
		this._id = Hashtable.GetNumber(def, "id");
		this._intrptType = Hashtable.GetNumber(def, "type");
		this._connectState = Hashtable.GetNumber(def, "connect_state");
		this._skillID = Hashtable.GetNumber(def, "skill");
		this._delay = Hashtable.GetNumber(def, "delay");
		const filterDefs = Hashtable.GetMapArray(def, "filters");
		if (filterDefs != null) {
			for (const filterDef of filterDefs) {
				const intrptFilter = new IntrptFilter();
				intrptFilter.filterType = Hashtable.GetNumber(filterDef, "filter_type");
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

	public Enter(): void {
		this._isTriggered = false;
		if (this._delay <= 0) {
			this.Trigger();
		}
		this.OnEnter();
	}

	public Exit(): void {
		this.OnExit();
	}

	public Update(dt: number): void {
		const time = this._state.time;
		if (!this._isTriggered) {
			if (time >= this._delay) {
				this.Trigger();
			}
		}
		else {
			this.OnUpdate(dt);
		}
	}

	public UpdatePhysic(dt: number): void {
		if (!this._isTriggered) {
			return;
		}
		this.OnUpdatePhysic(dt);
	}

	public HandleInput(type: InputType, press: boolean): void {
		this.OnInput(type, press);
	}

	private Trigger(): void {
		this._isTriggered = true;
		this.OnTrigger();
	}

	protected OnTrigger(): void {
	}

	protected OnEnter(): void {
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number): void {
	}

	protected OnUpdatePhysic(dt: number): void {
	}

	protected OnInput(type: InputType, press: boolean): void {
	}

	/**
	 * 检查过滤条件
	 */
	protected CheckFilter(): boolean {
		if (this._intrptFilters.length == 0) {
			return true;
		}
		const owner = (<EntityState>this._state).owner;
		let result: boolean = this._rel == FilterRel.And ? true : false;
		for (const intrptFilter of this._intrptFilters) {
			let v0: number;
			let v1: number;
			let meet: boolean;
			switch (intrptFilter.filterType) {
				case FilterType.AttrToAttr:
					v0 = owner.GetAttr(intrptFilter.attr0);
					v1 = owner.GetAttr(intrptFilter.attr1);
					break;
				case FilterType.AttrToValue:
					v0 = owner.GetAttr(intrptFilter.attr0);
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
		const owner = (<EntityState>this._state).owner;
		switch (this._intrptType) {
			case IntrptType.State://中断到状态
				owner.fsm.ChangeState(this._connectState, null, igroneIntrptList, force);
				break;
			case IntrptType.Skill://中断到技能
				const skill = owner.GetSkill(this._skillID);
				const meet = owner.mp >= skill.mpCost;
				if (meet) {//成功使用技能
					//在上下文中记录技能id
					owner.fsm.context.skillID = this._skillID;
					owner.fsm.ChangeState(skill.connectState, null, igroneIntrptList, force);
				}
				break;
		}
	}

	public Dump(): string {
		let str = "";
		str += `istriggered:${this._isTriggered}\n`;
		return str;
	}
}