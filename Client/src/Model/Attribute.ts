import Decimal from "../Libs/decimal";

export enum EAttr {
	RADIUS,
	MHP,
	HP,
	MMP,
	MP,
	ATK,
	DEF,
	MOVE_SPEED,
	MOVE_SPEED_FACTOR,
}

/**
 * 属性管理器
 */
export class Attribute {
	private readonly _map: Map<EAttr, Decimal> = new Map<EAttr, Decimal>();

	public get count(): number { return this._map.size; }

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