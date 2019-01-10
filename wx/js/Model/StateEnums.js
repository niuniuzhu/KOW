import { ActAttack } from "./Logic/FSM/ActAttack";
import { ActEntityAttrs } from "./Logic/FSM/ActEntityAttrs";
import { ActMove } from "./Logic/FSM/ActMove";
import { ActSprint } from "./Logic/FSM/ActSprint";
import { ActVelocity } from "./Logic/FSM/ActVelocity";
import { EntityStateAction } from "./Logic/FSM/EntityStateAction";
import { VActAnimation } from "./View/FSM/VActAnimation";
import { VActShake } from "./View/FSM/VActShake";
export var StateType;
(function (StateType) {
    StateType[StateType["Idle"] = 0] = "Idle";
    StateType[StateType["Move"] = 1] = "Move";
    StateType[StateType["Attack"] = 2] = "Attack";
    StateType[StateType["Die"] = 6] = "Die";
})(StateType || (StateType = {}));
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["None"] = -1] = "None";
    ActionType[ActionType["EntityAttrs"] = 1] = "EntityAttrs";
    ActionType[ActionType["Velocity"] = 2] = "Velocity";
    ActionType[ActionType["Shake"] = 3] = "Shake";
    ActionType[ActionType["Attack"] = 4] = "Attack";
    ActionType[ActionType["Move"] = 5] = "Move";
    ActionType[ActionType["Sprint"] = 6] = "Sprint";
})(ActionType || (ActionType = {}));
export var InterruptType;
(function (InterruptType) {
    InterruptType[InterruptType["Timeup"] = 0] = "Timeup";
    InterruptType[InterruptType["Collision"] = 1] = "Collision";
    InterruptType[InterruptType["Input"] = 2] = "Input";
})(InterruptType || (InterruptType = {}));
export const ID_TO_STATE_ACTION = new Map();
ID_TO_STATE_ACTION.set(ActionType.EntityAttrs, ActEntityAttrs);
ID_TO_STATE_ACTION.set(ActionType.Velocity, ActVelocity);
ID_TO_STATE_ACTION.set(ActionType.Shake, EntityStateAction);
ID_TO_STATE_ACTION.set(ActionType.Attack, ActAttack);
ID_TO_STATE_ACTION.set(ActionType.Move, ActMove);
ID_TO_STATE_ACTION.set(ActionType.Sprint, ActSprint);
export var VActionType;
(function (VActionType) {
    VActionType[VActionType["None"] = -1] = "None";
    VActionType[VActionType["Animation"] = 0] = "Animation";
    VActionType[VActionType["Shake"] = 4] = "Shake";
})(VActionType || (VActionType = {}));
export const V_ID_TO_STATE_ACTION = new Map();
V_ID_TO_STATE_ACTION.set(VActionType.Animation, VActAnimation);
V_ID_TO_STATE_ACTION.set(VActionType.Shake, VActShake);