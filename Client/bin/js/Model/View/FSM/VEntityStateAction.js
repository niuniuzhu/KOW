define(["require", "exports", "../../../RC/FSM/FSMStateAction"], function (require, exports, FSMStateAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEntityStateAction extends FSMStateAction_1.FSMStateAction {
        constructor(state, type, def) {
            super(state, type);
            this.OnInit(def);
        }
        OnInit(def) {
        }
    }
    exports.VEntityStateAction = VEntityStateAction;
});
//# sourceMappingURL=VEntityStateAction.js.map