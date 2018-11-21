define(["require", "exports", "../RC/Math/MathUtils"], function (require, exports, MathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Attr;
    (function (Attr) {
        Attr[Attr["MHP"] = 0] = "MHP";
        Attr[Attr["HP"] = 1] = "HP";
        Attr[Attr["MMP"] = 2] = "MMP";
        Attr[Attr["MP"] = 3] = "MP";
        Attr[Attr["ATK"] = 4] = "ATK";
        Attr[Attr["DEF"] = 5] = "DEF";
        Attr[Attr["MOVE_SPEED"] = 6] = "MOVE_SPEED";
        Attr[Attr["RADIUS"] = 7] = "RADIUS";
    })(Attr || (Attr = {}));
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
            this._map.set(attr, value + delta);
        }
        Sub(attr, delta) {
            const value = this._map.get(attr);
            this._map.set(attr, value - delta);
        }
        Mul(attr, factor) {
            const value = this._map.get(attr);
            this._map.set(attr, value * factor);
        }
        Div(attr, factor) {
            const value = this._map.get(attr);
            this._map.set(attr, value / factor);
        }
        Mod(attr, mod) {
            const value = this._map.get(attr);
            this._map.set(attr, value % mod);
        }
        Pow(attr, exp) {
            const value = this._map.get(attr);
            this._map.set(attr, MathUtils_1.MathUtils.Pow(value, exp));
        }
        Abs(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, MathUtils_1.MathUtils.Abs(value));
        }
        Sin(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, MathUtils_1.MathUtils.Sin(value));
        }
    }
    Attribute.Attr = Attr;
    exports.Attribute = Attribute;
});
//# sourceMappingURL=Attribute.js.map