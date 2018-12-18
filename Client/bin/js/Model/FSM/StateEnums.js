define(["require", "exports", "./ActEntityAttrs", "./ActInterrupt", "./ActVelocity", "./ActVelocityAcceleration"], function (require, exports, ActEntityAttrs_1, ActInterrupt_1, ActVelocity_1, ActVelocityAcceleration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateType;
    (function (StateType) {
        StateType[StateType["None"] = -1] = "None";
        StateType[StateType["Idle"] = 0] = "Idle";
        StateType[StateType["Move"] = 1] = "Move";
        StateType[StateType["Attack"] = 2] = "Attack";
        StateType[StateType["Die"] = 3] = "Die";
    })(StateType = exports.StateType || (exports.StateType = {}));
    var ActionType;
    (function (ActionType) {
        ActionType[ActionType["None"] = -1] = "None";
        ActionType[ActionType["Interrupt"] = 0] = "Interrupt";
        ActionType[ActionType["EntityAttrs"] = 1] = "EntityAttrs";
        ActionType[ActionType["Velocity"] = 2] = "Velocity";
        ActionType[ActionType["VelocityAcceleration"] = 3] = "VelocityAcceleration";
    })(ActionType = exports.ActionType || (exports.ActionType = {}));
    exports.ID_TO_STATE_ACTION = new Map();
    exports.ID_TO_STATE_ACTION.set(ActionType.Interrupt, ActInterrupt_1.ActInterrupt);
    exports.ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs_1.ActEntityAttrs);
    exports.ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity_1.ActVelocity);
    exports.ID_TO_STATE_ACTION.set(ActionType.VelocityAcceleration, ActVelocityAcceleration_1.ActVelocityAcceleration);
});
//# sourceMappingURL=StateEnums.js.map