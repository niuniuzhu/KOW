export enum EAttr {
	MHP,
	HP,
	MMP,
	MP,
	ATK,
	DEF,
	MOVE_DIRECTION_X,
	MOVE_DIRECTION_Y,
	INTERSET_VECTOR_X,
	INTERSET_VECTOR_Y,
	VELOCITY,
	GLADIATOR_TIME,

	S_DISABLE_MOVE = 500,
	S_DISABLE_TURN,
	S_DISABLE_SKILL,
	S_DISABLE_COLLISION,
	S_SUPPER_ARMOR = 550,
	S_INVULNER_ABILITY,
	S_HP_ADD = 600,
	S_MP_ADD,
	S_ATK_ADD,
	S_DEF_ADD,
	S_SPEED_ADD
}

// export const DEFAULT_ATTR_VALUES = new Map<EAttr, number>();
// DEFAULT_ATTR_VALUES.set(EAttr.MHP, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.HP, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.MMP, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.MP, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.ATK, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.DEF, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.MOVE_DIRECTION_X, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.MOVE_DIRECTION_Y, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.INTERSET_VECTOR_X, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.INTERSET_VECTOR_Y, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.VELOCITY, 0);

// DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_MOVE, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_TURN, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_SKILL, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.S_SUPPER_ARMOR, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.S_INVULNER_ABILITY, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_ADD, 0);
// DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_ADD, 0);

// /**
//  * 属性管理器
//  */
// export class Attribute {
// 	private readonly _map: Map<EAttr, number> = new Map<EAttr, number>();

// 	public get count(): number { return this._map.size; }

// 	/**
// 	 * 遍历属性
// 	 * @param handler 回调函数
// 	 */
// 	public Foreach(handler: (v: number, k: EAttr, map: Map<EAttr, number>) => void) {
// 		this._map.forEach(handler);
// 	}

// 	/**
// 	 * 设置属性
// 	 * @param attr 属性
// 	 * @param value 值
// 	 */
// 	public Set(attr: EAttr, value: number) {
// 		this._map.set(attr, value);
// 	}

// 	/**
// 	 * 获取属性
// 	 * @param attr 属性
// 	 */
// 	public Get(attr: EAttr): number {
// 		if (!this._map.has(attr))
// 			this._map.set(attr, DEFAULT_ATTR_VALUES.get(attr));
// 		return this._map.get(attr);
// 	}

// 	/**
// 	 * 是否存在属性
// 	 * @param attr 属性
// 	 */
// 	public Contains(attr: EAttr): boolean {
// 		return this._map.has(attr);
// 	}

// 	public Add(attr: EAttr, delta: number): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Add(value, delta));
// 	}

// 	public Sub(attr: EAttr, delta: number): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Sub(value, delta));
// 	}

// 	public Mul(attr: EAttr, factor: number): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Mul(value, factor));
// 	}

// 	public Div(attr: EAttr, factor: number): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Div(value, factor));
// 	}

// 	public Mod(attr: EAttr, mod: number): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Mod(value, mod));
// 	}

// 	public Pow(attr: EAttr, exp: number): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Pow(value, value));
// 	}

// 	public Exp(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Exp(value));
// 	}

// 	public Abs(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Abs(value));
// 	}

// 	public Sin(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Sin(value));
// 	}

// 	public Cos(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Cos(value));
// 	}

// 	public Tan(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Tan(value));
// 	}

// 	public ACos(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Acos(value));
// 	}

// 	public ASin(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Asin(value));
// 	}

// 	public ATan(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Atan(value));
// 	}

// 	public Sqrt(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Sqrt(value));
// 	}

// 	public Log(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Log(value));
// 	}

// 	public Log2(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Log2(value));
// 	}

// 	public Log10(attr: EAttr): void {
// 		const value = this._map.get(attr);
// 		this._map.set(attr, FMathUtils.Log10(value));
// 	}
// }