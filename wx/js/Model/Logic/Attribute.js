import { FMathUtils } from "../../RC/FMath/FMathUtils";
export var EAttr;
(function (EAttr) {
    EAttr[EAttr["RADIUS"] = 0] = "RADIUS";
    EAttr[EAttr["MHP"] = 1] = "MHP";
    EAttr[EAttr["HP"] = 2] = "HP";
    EAttr[EAttr["MMP"] = 3] = "MMP";
    EAttr[EAttr["MP"] = 4] = "MP";
    EAttr[EAttr["ATK"] = 5] = "ATK";
    EAttr[EAttr["DEF"] = 6] = "DEF";
    EAttr[EAttr["MOVE_SPEED"] = 7] = "MOVE_SPEED";
    EAttr[EAttr["MOVE_DIRECTION_X"] = 8] = "MOVE_DIRECTION_X";
    EAttr[EAttr["MOVE_DIRECTION_Y"] = 9] = "MOVE_DIRECTION_Y";
    EAttr[EAttr["INTERSET_VECTOR_X"] = 10] = "INTERSET_VECTOR_X";
    EAttr[EAttr["INTERSET_VECTOR_Y"] = 11] = "INTERSET_VECTOR_Y";
    EAttr[EAttr["VELOCITY"] = 12] = "VELOCITY";
    EAttr[EAttr["S_DISABLE_MOVE"] = 500] = "S_DISABLE_MOVE";
    EAttr[EAttr["S_DISABLE_TURN"] = 501] = "S_DISABLE_TURN";
    EAttr[EAttr["S_DISABLE_SKILL"] = 502] = "S_DISABLE_SKILL";
    EAttr[EAttr["S_SUPPER_ARMOR"] = 503] = "S_SUPPER_ARMOR";
    EAttr[EAttr["S_INVULNER_ABILITY"] = 504] = "S_INVULNER_ABILITY";
    EAttr[EAttr["S_MOVE_SPEED_ADD"] = 600] = "S_MOVE_SPEED_ADD";
    EAttr[EAttr["S_MOVE_SPEED_MUL"] = 601] = "S_MOVE_SPEED_MUL";
    EAttr[EAttr["S_ATK_ADD"] = 602] = "S_ATK_ADD";
    EAttr[EAttr["S_ATK_MUL"] = 603] = "S_ATK_MUL";
    EAttr[EAttr["S_DEF_ADD"] = 604] = "S_DEF_ADD";
    EAttr[EAttr["S_DEF_MUL"] = 605] = "S_DEF_MUL";
})(EAttr || (EAttr = {}));
export const DEFAULT_ATTR_VALUES = new Map();
DEFAULT_ATTR_VALUES.set(EAttr.RADIUS, 0);
DEFAULT_ATTR_VALUES.set(EAttr.MHP, 0);
DEFAULT_ATTR_VALUES.set(EAttr.HP, 0);
DEFAULT_ATTR_VALUES.set(EAttr.MMP, 0);
DEFAULT_ATTR_VALUES.set(EAttr.MP, 0);
DEFAULT_ATTR_VALUES.set(EAttr.ATK, 0);
DEFAULT_ATTR_VALUES.set(EAttr.DEF, 0);
DEFAULT_ATTR_VALUES.set(EAttr.MOVE_SPEED, 0);
DEFAULT_ATTR_VALUES.set(EAttr.MOVE_DIRECTION_X, 0);
DEFAULT_ATTR_VALUES.set(EAttr.MOVE_DIRECTION_Y, 0);
DEFAULT_ATTR_VALUES.set(EAttr.INTERSET_VECTOR_X, 0);
DEFAULT_ATTR_VALUES.set(EAttr.INTERSET_VECTOR_Y, 0);
DEFAULT_ATTR_VALUES.set(EAttr.VELOCITY, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_MOVE, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_TURN, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_SKILL, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_SUPPER_ARMOR, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_INVULNER_ABILITY, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_MOVE_SPEED_ADD, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_MOVE_SPEED_MUL, 1);
DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_ADD, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_MUL, 1);
DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_ADD, 0);
DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_MUL, 1);
export class Attribute {
    constructor() {
        this._map = new Map();
    }
    get count() { return this._map.size; }
    Foreach(handler) {
        this._map.forEach(handler);
    }
    Set(attr, value) {
        this._map.set(attr, value);
    }
    Get(attr) {
        if (!this._map.has(attr))
            this._map.set(attr, DEFAULT_ATTR_VALUES.get(attr));
        return this._map.get(attr);
    }
    Contains(attr) {
        return this._map.has(attr);
    }
    Add(attr, delta) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Add(value, delta));
    }
    Sub(attr, delta) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Sub(value, delta));
    }
    Mul(attr, factor) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Mul(value, factor));
    }
    Div(attr, factor) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Div(value, factor));
    }
    Mod(attr, mod) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Mod(value, mod));
    }
    Pow(attr, exp) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Pow(value, value));
    }
    Exp(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Exp(value));
    }
    Abs(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Abs(value));
    }
    Sin(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Sin(value));
    }
    Cos(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Cos(value));
    }
    Tan(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Tan(value));
    }
    ACos(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Acos(value));
    }
    ASin(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Asin(value));
    }
    ATan(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Atan(value));
    }
    Sqrt(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Sqrt(value));
    }
    Log(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Log(value));
    }
    Log2(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Log2(value));
    }
    Log10(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, FMathUtils.Log10(value));
    }
}
