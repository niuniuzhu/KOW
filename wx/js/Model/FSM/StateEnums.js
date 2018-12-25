import { ActEntityAttrs } from "./ActEntityAttrs";
import { ActInterrupt } from "./ActInterrupt";
import { ActVelocity } from "./ActVelocity";
import { ActVelocityAcceleration } from "./ActVelocityAcceleration";
export var StateType;
(function (StateType) {
    StateType[StateType["None"] = -1] = "None";
    StateType[StateType["Idle"] = 0] = "Idle";
    StateType[StateType["Move"] = 1] = "Move";
    StateType[StateType["Attack"] = 2] = "Attack";
    StateType[StateType["Die"] = 3] = "Die";
})(StateType || (StateType = {}));
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["None"] = -1] = "None";
    ActionType[ActionType["Interrupt"] = 0] = "Interrupt";
    ActionType[ActionType["EntityAttrs"] = 1] = "EntityAttrs";
    ActionType[ActionType["Velocity"] = 2] = "Velocity";
    ActionType[ActionType["VelocityAcceleration"] = 3] = "VelocityAcceleration";
})(ActionType || (ActionType = {}));
export const ID_TO_STATE_ACTION = new Map();
ID_TO_STATE_ACTION.set(ActionType.Interrupt, ActInterrupt);
ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs);
ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity);
ID_TO_STATE_ACTION.set(ActionType.VelocityAcceleration, ActVelocityAcceleration);
