define(["require", "exports", "../../RC/FSM/FSMState", "../../RC/Utils/Hashtable", "./StateEnums"], function (require, exports, FSMState_1, Hashtable_1, StateEnums_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EntityStateBase extends FSMState_1.FSMState {
        constructor() {
            super(...arguments);
            this._idToActions = new Map();
        }
        Init(def) {
            const actionsDef = Hashtable_1.Hashtable.GetMapArray(def, "actions");
            if (actionsDef != null)
                this.CreateActions(actionsDef);
        }
        CreateActions(actionsDef) {
            let actionDef;
            for (actionDef of actionsDef) {
                const id = Hashtable_1.Hashtable.GetNumber(actionDef, "id");
                const ctr = StateEnums_1.ID_TO_STATE_ACTION.get(id);
                const action = new ctr(this, id, actionDef);
                this.AddAction(action);
            }
        }
        AddAction(action) {
            super.AddAction(action);
            this._idToActions.set(action.id, action);
            switch (action.id) {
                case StateEnums_1.EntityAttrsID:
                    this._entityAttrs = action;
                    break;
                case StateEnums_1.StateAttrsID:
                    this._stateAttrs = action;
                    break;
            }
        }
        RemoveAction(action) {
            super.RemoveAction(action);
            switch (action.id) {
                case StateEnums_1.EntityAttrsID:
                    this._entityAttrs = null;
                    break;
                case StateEnums_1.StateAttrsID:
                    this._stateAttrs = null;
                    break;
            }
            this._idToActions.delete(action.id);
        }
        GetAction(id) {
            return this._idToActions.get(id);
        }
        CanMove() {
            if (this._stateAttrs != null) {
                if (!this._stateAttrs.canMove)
                    return false;
            }
            return true;
        }
        CanTurn() {
            if (this._stateAttrs != null) {
                if (!this._stateAttrs.canTurn)
                    return false;
            }
            return true;
        }
        IsSuperArmor() {
            if (this._stateAttrs != null) {
                if (!this._stateAttrs.isSuperArmor)
                    return false;
            }
            return true;
        }
        IsInvulnerability() {
            if (this._stateAttrs != null) {
                if (!this._stateAttrs.isInvulnerability)
                    return false;
            }
            return true;
        }
        CanUseSkill() {
            if (this._stateAttrs != null) {
                if (!this._stateAttrs.canUseSkill)
                    return false;
            }
            return true;
        }
    }
    exports.EntityStateBase = EntityStateBase;
});
//# sourceMappingURL=EntityStateBase.js.map