import Decimal from "../Libs/decimal";

enum Attr {
	MHP,
	HP,
	MMP,
	MP,
	ATK,
	DEF,
	MOVE_SPEED,
	RADIUS
}

/**
 * 属性管理器
 */
export class Attribute {
	public static readonly Attr = Attr;

	private readonly _map: Map<Attr, Decimal> = new Map<Attr, Decimal>();

	public get count(): number { return this._map.size; }

	/**
	 * 遍历属性
	 * @param handler 回调函数
	 */
	public Foreach(handler: (v: Decimal, k: Attr, map: Map<Attr, Decimal>) => void) {
		this._map.forEach(handler);
	}

	/**
	 * 设置属性
	 * @param attr 属性
	 * @param value 值
	 */
	public Set(attr: Attr, value: Decimal) {
		this._map.set(attr, value);
	}

	/**
	 * 获取属性
	 * @param attr 属性
	 */
	public Get(attr: Attr): Decimal {
		return this._map.get(attr);
	}

	/**
	 * 是否存在属性
	 * @param attr 属性
	 */
	public Contains(attr: Attr): boolean {
		return this._map.has(attr);
	}

	public Add(attr: Attr, delta: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.add(delta));
	}

	public Sub(attr: Attr, delta: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.sub(delta));
	}

	public Mul(attr: Attr, factor: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.mul(factor));
	}

	public Div(attr: Attr, factor: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.div(factor));
	}

	public Mod(attr: Attr, mod: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, value.mod(mod));
	}

	public Pow(attr: Attr, exp: Decimal): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.pow(value, exp));
	}

	public Abs(attr: Attr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.abs(value));
	}

	public Sin(attr: Attr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Decimal.sin(value));
	}
}