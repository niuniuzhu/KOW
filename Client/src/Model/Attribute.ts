import { MathUtils } from "../RC/Math/MathUtils";

enum Attr {
	MHP,
	HP,
	MMP,
	MP,
	ATK,
	DEF,
	MOVE_SPEED,
	TURN_SPEED
}

/**
 * 属性管理器
 */
export class Attribute {
	public static readonly Attr = Attr;

	private readonly _map: Map<Attr, number> = new Map<Attr, number>();

	public get count(): number { return this._map.size; }

	/**
	 * 遍历属性
	 * @param handler 回调函数
	 */
	public Foreach(handler: (v, k, map) => void) {
		this._map.forEach(handler);
	}

	/**
	 * 设置属性
	 * @param attr 属性
	 * @param value 值
	 */
	public Set(attr: Attr, value: number) {
		this._map.set(attr, value);
	}

	/**
	 * 获取属性
	 * @param attr 属性
	 */
	public Get(attr: Attr): number {
		return this._map.get(attr);
	}

	/**
	 * 是否存在属性
	 * @param attr 属性
	 */
	public Contains(attr: Attr): boolean {
		return this._map.has(attr);
	}

	public Add(attr: Attr, delta: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value + delta);
	}

	public Sub(attr: Attr, delta: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value - delta);
	}

	public Mul(attr: Attr, factor: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value * factor);
	}

	public Div(attr: Attr, factor: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value / factor);
	}

	public Mod(attr: Attr, mod: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value % mod);
	}

	public Pow(attr: Attr, exp: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, MathUtils.Pow(value, exp));
	}

	public Abs(attr: Attr): void {
		const value = this._map.get(attr);
		this._map.set(attr, MathUtils.Abs(value));
	}

	public Sin(attr: Attr): void {
		const value = this._map.get(attr);
		this._map.set(attr, MathUtils.Sin(value));
	}
}