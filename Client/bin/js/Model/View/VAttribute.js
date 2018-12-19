define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VAttribute {
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
            this._map.set(attr, value % (value));
        }
        Pow(attr, exp) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.pow(value, value));
        }
        Exp(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.exp(value));
        }
        Abs(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.abs(value));
        }
        Sin(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.sin(value));
        }
        Cos(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.cos(value));
        }
        Tan(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.tan(value));
        }
        ACos(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.acos(value));
        }
        ASin(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.asin(value));
        }
        ATan(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.atan(value));
        }
        Sqrt(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.sqrt(value));
        }
        Log(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.log(value));
        }
        Log2(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.log2(value));
        }
        Log10(attr) {
            const value = this._map.get(attr);
            this._map.set(attr, Math.log10(value));
        }
    }
    exports.VAttribute = VAttribute;
});
//# sourceMappingURL=VAttribute.js.map