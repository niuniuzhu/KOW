import { EAttr } from "../Logic/Attribute";

/**
 * 属性管理器
 */
export class VAttribute {
	private readonly _map: Map<EAttr, number> = new Map<EAttr, number>();

	public get count(): number { return this._map.size; }

	constructor() {
	}

	/**
	 * 遍历属性
	 * @param handler 回调函数
	 */
	public Foreach(handler: (v: number, k: EAttr, map: Map<EAttr, number>) => void) {
		this._map.forEach(handler);
	}

	/**
	 * 设置属性
	 * @param attr 属性
	 * @param value 值
	 */
	public Set(attr: EAttr, value: number) {
		this._map.set(attr, value);
	}

	/**
	 * 获取属性
	 * @param attr 属性
	 */
	public Get(attr: EAttr): number {
		return this._map.get(attr);
	}

	/**
	 * 是否存在属性
	 * @param attr 属性
	 */
	public Contains(attr: EAttr): boolean {
		return this._map.has(attr);
	}

	public Add(attr: EAttr, delta: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value + delta);
	}

	public Sub(attr: EAttr, delta: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value - delta);
	}

	public Mul(attr: EAttr, factor: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value * factor);
	}

	public Div(attr: EAttr, factor: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value / factor);
	}

	public Mod(attr: EAttr, mod: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, value % (value));
	}

	public Pow(attr: EAttr, exp: number): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.pow(value, value));
	}

	public Exp(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.exp(value));
	}

	public Abs(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.abs(value));
	}

	public Sin(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.sin(value));
	}

	public Cos(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.cos(value));
	}

	public Tan(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.tan(value));
	}

	public ACos(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.acos(value));
	}

	public ASin(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.asin(value));
	}

	public ATan(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.atan(value));
	}

	public Sqrt(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.sqrt(value));
	}

	public Log(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.log(value));
	}

	public Log2(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.log2(value));
	}

	public Log10(attr: EAttr): void {
		const value = this._map.get(attr);
		this._map.set(attr, Math.log10(value));
	}
}