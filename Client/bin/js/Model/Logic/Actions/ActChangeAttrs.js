define(["require", "exports", "../../../RC/Utils/Hashtable", "./EntityAction", "../../../RC/FMath/FMathUtils"], function (require, exports, Hashtable_1, EntityAction_1, FMathUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActChangeAttrs extends EntityAction_1.EntityAction {
        OnInit(def) {
            super.OnInit(def);
            this._attrs = Hashtable_1.Hashtable.GetNumberArray(def, "attrs");
            this._values = Hashtable_1.Hashtable.GetNumberArray(def, "values");
        }
        OnTrigger() {
            super.OnTrigger();
            const count = this._attrs.length;
            for (let i = 0; i < count; ++i) {
                this.owner.SetAttr(this._attrs[i], FMathUtils_1.FMathUtils.Add(this.owner.GetAttr(this._attrs[i]), this._values[i]));
            }
        }
        OnExit() {
            this.DeactiveAttrs();
            super.OnExit();
        }
        DeactiveAttrs() {
            const count = this._attrs.length;
            for (let i = 0; i < count; ++i) {
                this.owner.SetAttr(this._attrs[i], FMathUtils_1.FMathUtils.Sub(this.owner.GetAttr(this._attrs[i]), this._values[i]));
            }
        }
    }
    exports.ActChangeAttrs = ActChangeAttrs;
});
//# sourceMappingURL=ActChangeAttrs.js.map