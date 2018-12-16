define(["require", "exports", "../../RC/Utils/Hashtable", "./EntityStateAction", "./StateEnums"], function (require, exports, Hashtable_1, EntityStateAction_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActStateAttrs extends EntityStateAction_1.EntityStateAction {
        constructor(state, id, def) {
            super(state, id, def);
            this._stateAttr = 0;
            const arr = Hashtable_1.Hashtable.GetNumberArray(def, "state_attrs");
            let stateType = 0;
            let stateTypeDef = 0;
            for (stateTypeDef of arr) {
                stateType |= 1 << stateTypeDef;
            }
            this._stateAttr = stateType;
        }
        get canMove() { return (this._stateAttr & StateEnums_1.StateAttr.DisableMove) == 0; }
        get canTurn() { return (this._stateAttr & StateEnums_1.StateAttr.DisableTurn) == 0; }
        get isSuperArmor() { return (this._stateAttr & StateEnums_1.StateAttr.SuperArmor) > 0; }
        get isInvulnerability() { return (this._stateAttr & StateEnums_1.StateAttr.Invulnerability) > 0; }
        get canUseSkill() { return (this._stateAttr & StateEnums_1.StateAttr.DisableUseSkill) == 0; }
    }
    exports.ActStateAttrs = ActStateAttrs;
});
//# sourceMappingURL=ActStateAttrs.js.map