import Decimal from "../Libs/decimal";
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
export class Attribute {
    constructor() {
        this._map = new Map();
        DEFAULT_ATTR_VALUES.forEach((v, k, m) => {
            this._map.set(k, v);
        });
    }
    get count() { return this._map.size; }
    Foreach(handler) {
        this._map.forEach(handler);
    }
    Set(attr, value) {
        this._map.set(attr, value);
    }
    Get(attr) {
        return this._map.get(attr);
    }
    Contains(attr) {
        return this._map.has(attr);
    }
    Add(attr, delta) {
        const value = this._map.get(attr);
        this._map.set(attr, value.add(delta));
    }
    Sub(attr, delta) {
        const value = this._map.get(attr);
        this._map.set(attr, value.sub(delta));
    }
    Mul(attr, factor) {
        const value = this._map.get(attr);
        this._map.set(attr, value.mul(factor));
    }
    Div(attr, factor) {
        const value = this._map.get(attr);
        this._map.set(attr, value.div(factor));
    }
    Mod(attr, mod) {
        const value = this._map.get(attr);
        this._map.set(attr, value.mod(mod));
    }
    Pow(attr, exp) {
        const value = this._map.get(attr);
        this._map.set(attr, Decimal.pow(value, exp));
    }
    Exp(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, Decimal.exp(value));
    }
    Abs(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, Decimal.abs(value));
    }
    Sin(attr) {
        const value = this._map.get(attr);
        this._map.set(attr, Decimal.sin(value));
    }
}
