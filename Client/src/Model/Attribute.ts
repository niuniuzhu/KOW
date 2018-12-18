import Decimal from "../Libs/decimal";

export enum EAttr {
	RADIUS = 0,
	MHP,
	HP,
	MMP,
	MP,
	ATK,
	DEF,
	MOVE_SPEED,

	S_DISABLE_MOVE = 500,
	S_DISABLE_TURN,
	S_DISABLE_SKILL,
	S_SUPPER_ARMOR,
	S_INVULNER_ABILITY,
	S_MOVE_SPEED_ADD = 600,
	S_MOVE_SPEED_MUL,
	S_ATK_ADD,
	S_ATK_MUL,
	S_DEF_ADD,
	S_DEF_MUL
}

export const DEFAULT_ATTR_VALUES: Map<EAttr, Decimal> = new Map<EAttr, Decimal>();
DEFAULT_ATTR_VALUES.set(EAttr.RADIUS, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.MHP, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.HP, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.MMP, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.MP, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.ATK, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.DEF, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.MOVE_SPEED, new Decimal(0));

DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_MOVE, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_TURN, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_SKILL, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_SUPPER_ARMOR, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_INVULNER_ABILITY, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_MOVE_SPEED_ADD, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_MOVE_SPEED_MUL, new Decimal(1));
DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_ADD, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_MUL, new Decimal(1));
DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_ADD, new Decimal(0));
DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_MUL, new Decimal(1));

/**
 * 属性管理器
 */
export class Attribute {
	private readonly _map: Map<EAttr, Decimal> = new Map<EAttr, Decimal>();

	public get count(): number { return this._map.size; }

	constructor() {
		DEFAULT_ATTR_VALUES.forEach((v, k, m) => {
			this._map.set(k, v);
		});
	}

	/**
	 * 遍历属性
	 * @param handler 回调函数
	 */
	public Foreach(handler: (v: Decimal, k: EAttr, map: Map<EAttr, Decimal>) => void) {
		this._map.forEach(handler);
	}

	/**
	 * 设置属性
	 * @param attr 属性
	 * @param value 值
	 */
	public Set(attr: EAttr, value: Decimal) {
		this._map.set(attr, value);
	}

	/**
	 * 获取属性
	 * @param attr 属性
	 */
	public Get(attr: EAttr): Decimal {
		return this._map.get(attr);
	}

	/**
	 * 是否存在属性
	 * @param attr 属性
	 */
	public Contains(attr: EAttr): boolean {
		return this._map.has(attr);
	}

	public Add(attr: EAttr, delta: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.add(delta));
	}

	public Sub(attr: EAttr, delta: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.sub(delta));
	}

	public Mul(attr: EAttr, factor: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.mul(factor));
	}

	public Div(attr: EAttr, factor: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.div(factor));
	}

	public Mod(attr: EAttr, mod: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.mod(mod));
	}

	public Pow(attr: EAttr, exp: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.pow(value, exp));
	}

	public Exp(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.exp(value));
	}

	public Abs(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.abs(value));
	}

	public Sin(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.sin(value));
	}
}