define(["require", "exports", "../../../RC/FMath/FMathUtils", "../../../RC/Utils/Hashtable", "./BulletAction"], function (require, exports, FMathUtils_1, Hashtable_1, BulletAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Op;
    (function (Op) {
        Op[Op["Equal"] = 0] = "Equal";
        Op[Op["Add"] = 1] = "Add";
        Op[Op["Mul"] = 2] = "Mul";
    })(Op || (Op = {}));
    class ActBulletChangeAttrs extends BulletAction_1.BulletAction {
        OnInit(def) {
            super.OnInit(def);
            this._phase = BulletAction_1.BulletActionPhase.Collision;
            this._attrs = Hashtable_1.Hashtable.GetNumberArray(def, "attrs");
            this._values = Hashtable_1.Hashtable.GetNumberArray(def, "values");
            this._ops = Hashtable_1.Hashtable.GetNumberArray(def, "ops");
        }
        OnBulletCollision(target) {
            const count = this._attrs.length;
            for (let i = 0; i < count; ++i) {
                switch (this._ops[i]) {
                    case Op.Equal:
                        target.SetAttr(this._attrs[i], this._values[i]);
                        break;
                    case Op.Add:
                        target.SetAttr(this._attrs[i], FMathUtils_1.FMathUtils.Add(target.GetAttr(this._attrs[i]), this._values[i]));
                        break;
                    case Op.Mul:
                        target.SetAttr(this._attrs[i], FMathUtils_1.FMathUtils.Mul(target.GetAttr(this._attrs[i]), this._values[i]));
                        break;
                }
            }
        }
    }
    exports.ActBulletChangeAttrs = ActBulletChangeAttrs;
});
//# sourceMappingURL=ActBulletChangeAttrs.js.map