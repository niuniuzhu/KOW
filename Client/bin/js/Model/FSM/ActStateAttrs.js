define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction"], function (require, exports, Hashtable_1, EntityStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActStateAttrs extends EntityStateAction_1.EntityStateAction {
        constructor(state, def) {
            super(state, def);
            this._stateAttr = 0;
            const arr = Hashtable_1.Hashtable.GetNumberArray(def, "state_attrs");
            let stateType = 0;
            let stateTypeDef = 0;
            for (stateTypeDef of arr) {
                stateType |= 1 << stateTypeDef;
            }
            this._stateAttr = stateType;
        }
    }
    exports.ActStateAttrs = ActStateAttrs;
});
//# sourceMappingURL=ActStateAttrs.js.map