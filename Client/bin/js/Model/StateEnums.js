define(["require", "exports", "./Logic/FSM/ActAttack", "./Logic/FSM/ActEntityAttrs", "./Logic/FSM/ActMove", "./Logic/FSM/ActSprint", "./Logic/FSM/ActVelocity", "./Logic/FSM/EntityStateAction", "./View/FSM/VActAnimation", "./View/FSM/VActEffect", "./View/FSM/VActShake"], function (require, exports, ActAttack_1, ActEntityAttrs_1, ActMove_1, ActSprint_1, ActVelocity_1, EntityStateAction_1, VActAnimation_1, VActEffect_1, VActShake_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateType;
    (function (StateType) {
        StateType[StateType["Idle"] = 0] = "Idle";
        StateType[StateType["Move"] = 1] = "Move";
        StateType[StateType["Attack"] = 2] = "Attack";
        StateType[StateType["Die"] = 6] = "Die";
    })(StateType = exports.StateType || (exports.StateType = {}));
    var ActionType;
    (function (ActionType) {
        ActionType[ActionType["None"] = -1] = "None";
        ActionType[ActionType["EntityAttrs"] = 1] = "EntityAttrs";
        ActionType[ActionType["Velocity"] = 2] = "Velocity";
        ActionType[ActionType["Shake"] = 3] = "Shake";
        ActionType[ActionType["Attack"] = 4] = "Attack";
        ActionType[ActionType["Move"] = 5] = "Move";
        ActionType[ActionType["Sprint"] = 6] = "Sprint";
    })(ActionType = exports.ActionType || (exports.ActionType = {}));
    var InterruptType;
    (function (InterruptType) {
        InterruptType[InterruptType["Timeup"] = 0] = "Timeup";
        InterruptType[InterruptType["Collision"] = 1] = "Collision";
        InterruptType[InterruptType["Input"] = 2] = "Input";
    })(InterruptType = exports.InterruptType || (exports.InterruptType = {}));
    exports.ID_TO_STATE_ACTION = new Map();
    exports.ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs_1.ActEntityAttrs);
    exports.ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity_1.ActVelocity);
    exports.ID_TO_STATE_ACTION.set(ActionType.Shake, EntityStateAction_1.EntityStateAction);
    exports.ID_TO_STATE_ACTION.set(ActionType.Attack, ActAttack_1.ActAttack);
    exports.ID_TO_STATE_ACTION.set(ActionType.Move, ActMove_1.ActMove);
    exports.ID_TO_STATE_ACTION.set(ActionType.Sprint, ActSprint_1.ActSprint);
    var VActionType;
    (function (VActionType) {
        VActionType[VActionType["None"] = -1] = "None";
        VActionType[VActionType["Animation"] = 0] = "Animation";
        VActionType[VActionType["Shake"] = 4] = "Shake";
        VActionType[VActionType["Effect"] = 5] = "Effect";
    })(VActionType = exports.VActionType || (exports.VActionType = {}));
    exports.V_ID_TO_STATE_ACTION = new Map();
    exports.V_ID_TO_STATE_ACTION.set(VActionType.Animation, VActAnimation_1.VActAnimation);
    exports.V_ID_TO_STATE_ACTION.set(VActionType.Shake, VActShake_1.VActShake);
    exports.V_ID_TO_STATE_ACTION.set(VActionType.Effect, VActEffect_1.VActEffect);
});
//# sourceMappingURL=StateEnums.js.map