define(["require", "exports", "../Libs/decimal"], function (require, exports, decimal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var EAttr;
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
    })(EAttr = exports.EAttr || (exports.EAttr = {}));
    exports.DEFAULT_ATTR_VALUES = new Map();
    exports.DEFAULT_ATTR_VALUES.set(EAttr.RADIUS, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.MHP, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.HP, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.MMP, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.MP, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.ATK, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.DEF, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.MOVE_SPEED, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_MOVE, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_TURN, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_DISABLE_SKILL, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_SUPPER_ARMOR, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_INVULNER_ABILITY, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_MOVE_SPEED_ADD, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_MOVE_SPEED_MUL, new decimal_1.default(1));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_ADD, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_ATK_MUL, new decimal_1.default(1));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_ADD, new decimal_1.default(0));
    exports.DEFAULT_ATTR_VALUES.set(EAttr.S_DEF_MUL, new decimal_1.default(1));
    class Attribute {
        constructor() {
            this._map = new Map();
            exports.DEFAULT_ATTR_VALUES.forEach((v, k, m) => {
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
            this._map.set(attr, decimal_1.default.pow(value, exp));
        }
        Exp(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, decimal_1.default.exp(value));
        }
        Abs(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, decimal_1.default.abs(value));
        }
        Sin(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, decimal_1.default.sin(value));
        }
    }
    exports.Attribute = Attribute;
});
//# sourceMappingURL=Attribute.js.map