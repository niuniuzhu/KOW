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
        }
        RemoveAction(action) {
            super.RemoveAction(action);
            this._idToActions.delete(action.id);
        }
        GetAction(id) {
            return this._idToActions.get(id);
        }
    }
    exports.EntityStateBase = EntityStateBase;
});
//# sourceMappingURL=EntityStateBase.js.map