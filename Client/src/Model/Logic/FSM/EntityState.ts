import Decimal from "../../../Libs/decimal";
import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EAttr } from "../../Attribute";
import { EventTreeBase } from "../../EventTree/EventTreeBase";
import { Entity } from "../Entity";

enum Type {
	None = -1,
	Idle,
	Move,
	Attack,
	Die
}

enum Op {
	Equal,
	Add,
	Mul,
	Mod,
	Pow,
	Exp
}

enum StateAttr {
	DisableMove,
	DisableTurn,
	SuperArmor,//霸体
	Invulnerability,//刀枪不入
	ClearLastBullets,//清理上次子弹
}

type pair = { [k: string]: any };

export class EntityState extends FSMState {
	public static readonly Type = Type;
	public static readonly Op = Op;
	public static readonly StateAttr = StateAttr;

	/**
	 * 所属实体
	 */
	public get owner(): Entity { return this._owner; }
	/**
	 * 获取状态运行时间
	 */
	public get time(): Decimal { return this._time; }
	/**
	 * 设置状态运行时间
	 */
	public set time(value: Decimal) {
		if (this._time.equals(value))
			return;
		this._time = value;
		this.OnStateTimeChanged();
	}

	/**
	 * 所属实体
	 */
	private _owner: Entity;
	/**
	 * 默认连接状态
	 */
	private _defaultConnectState: Type
	/**
	 * 状态属性
	 */
	private _stateAttr: StateAttr;
	/**
	 * 状态持续时长
	 */
	private _duration: Decimal;
	/**
	 * 根事件
	 */
	private readonly _rootEvent: EventTreeBase = new EventTreeBase();
	/**
	 * 状态的运行时间
	 */
	private _time: Decimal = new Decimal(0);
	/**
	 * 状态配置
	 */
	private _def: { [k: string]: any; };

	constructor(type: number, owner: Entity) {
		super(type);

		this._owner = owner;
	}

	protected OnEnter(param: any): void {
		if (this._def == null) {
			this._def = Hashtable.GetMap(Hashtable.GetMap(this._owner.def, "states"), this.type.toString());
			//初始化根事件
			const eventDef = Hashtable.GetArray(this._def, "events");
			this._rootEvent.Set(eventDef);
		}
		this.HandleAttrs();
		this.HandleEvents();
	}

	protected OnExit(): void {
		this._time = new Decimal(0);
	}

	protected OnUpdate(dt: Decimal): void {
		if (this._time.greaterThanOrEqualTo(this._duration)) {
			if (this._defaultConnectState != Type.None) {
				this._owner.fsm.ChangeState(this._defaultConnectState, null, true);
			}
		}
		this._time = this._time.add(dt);
		this._rootEvent.Update(dt);
	}

	protected OnStateTimeChanged(): void {
		//can be overrided
	}

	/**
	 * 处理属性
	 */
	private HandleAttrs(): void {
		const attrs = Hashtable.GetArray(this._def, "attrs");
		const ops = Hashtable.GetArray(this._def, "ops");
		const values = Hashtable.GetArray(this._def, "values");
		const count = attrs.length;
		for (let i = 0; i < count; ++i) {
			this.ActiveAttr(attrs[i], ops[i], new Decimal(values[i]));
		}
	}

	private ActiveAttr(attr: EAttr, op: Op, value: Decimal): any {
		switch (op) {
			case Op.Equal:
				this.owner.attribute.Set(attr, value);
				break;
			case Op.Add:
				this.owner.attribute.Add(attr, value);
				break;
			case Op.Mul:
				this.owner.attribute.Mul(attr, value);
				break;
			case Op.Mod:
				this.owner.attribute.Mod(attr, value);
				break;
			case Op.Pow:
				this.owner.attribute.Pow(attr, value);
				break;
			case Op.Exp:
				this.owner.attribute.Exp(attr);
				break;
		}
	}

	private DeactiveAttr(attr: EAttr, op: Op, value: Decimal): any {
	}

	/**
	 * 处理事件
	 */
	private HandleEvents(): void {
	}
}