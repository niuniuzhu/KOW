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
        EAttr[EAttr["MOVE_SPEED_FACTOR"] = 8] = "MOVE_SPEED_FACTOR";
    })(EAttr = exports.EAttr || (exports.EAttr = {}));
    class Attribute {
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