import Decimal from "../../../Libs/decimal";
import { FSMState } from "../../../RC/FSM/FSMState";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EAttr } from "../../Attribute";
import { Entity } from "../Entity";

enum Type {
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

export class EntityState extends FSMState {
	public static readonly Type = Type;
	public static readonly Op = Op;

	/**
	 * 所属实体
	 */
	public get owner(): Entity { return this._owner; }

	/**
	 * 状态的运行时间
	 */
	public time: number;

	private _owner: Entity;

	constructor(type: number, owner: Entity) {
		super(type);
		this._owner = owner;
	}

	protected OnEnter(param: any): void {
		const def = Hashtable.GetMap(Hashtable.GetMap(this.owner.def, "states"), this.type.toString());
		//处理attr
		const attrs = Hashtable.GetArray(def, "attrs");
		const ops = Hashtable.GetArray(def, "ops");
		const values = Hashtable.GetArray(def, "values");
		const count = attrs.length;
		for (let i = 0; i < count; ++i) {
			this.ActiveAttr(attrs[i], ops[i], new Decimal(values[i]));
		}
		//处理事件
		const events = Hashtable.GetArray(def, "events");
	}

	private ActiveAttr(attr: EAttr, op: Op, value: Decimal): any {
		switch (op) {
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
}