import { ActAttack } from "./Logic/Actions/ActAttack";
import { ActBulletChangeAttrs } from "./Logic/Actions/ActBulletChangeAttrs";
import { ActBulletIntrptState } from "./Logic/Actions/ActBulletIntrptState";
import { ActChangeAttrs } from "./Logic/Actions/ActChangeAttrs";
import { ActIntrptCollider } from "./Logic/Actions/ActIntrptCollider";
import { ActIntrptInput } from "./Logic/Actions/ActIntrptInput";
import { ActIntrptTimeup } from "./Logic/Actions/ActIntrptTimeup";
import { ActMove } from "./Logic/Actions/ActMove";
import { ActShake } from "./Logic/Actions/ActShake";
import { ActSprint } from "./Logic/Actions/ActSprint";
import { ActVelocity } from "./Logic/Actions/ActVelocity";
import { VActAnimation } from "./View/FSM/VActAnimation";
import { VActEffect } from "./View/FSM/VActEffect";
import { VActShakeEffect } from "./View/FSM/VActShakeEffect";
export var StateType;
(function (StateType) {
    StateType[StateType["Idle"] = 0] = "Idle";
    StateType[StateType["Move"] = 1] = "Move";
    StateType[StateType["Attack"] = 2] = "Attack";
    StateType[StateType["Shake"] = 3] = "Shake";
    StateType[StateType["Sprint"] = 4] = "Sprint";
    StateType[StateType["Attack3"] = 5] = "Attack3";
    StateType[StateType["Die"] = 6] = "Die";
    StateType[StateType["Attack2"] = 7] = "Attack2";
})(StateType || (StateType = {}));
export var ActionType;
(function (ActionType) {
    ActionType[ActionType["None"] = -1] = "None";
    ActionType[ActionType["ChangeAttrs"] = 1] = "ChangeAttrs";
    ActionType[ActionType["Velocity"] = 2] = "Velocity";
    ActionType[ActionType["Shake"] = 3] = "Shake";
    ActionType[ActionType["Attack"] = 4] = "Attack";
    ActionType[ActionType["Move"] = 5] = "Move";
    ActionType[ActionType["Sprint"] = 6] = "Sprint";
    ActionType[ActionType["Timeup"] = 100] = "Timeup";
    ActionType[ActionType["Collision"] = 101] = "Collision";
    ActionType[ActionType["Input"] = 102] = "Input";
    ActionType[ActionType["Custom"] = 999] = "Custom";
})(ActionType || (ActionType = {}));
export var VActionType;
(function (VActionType) {
    VActionType[VActionType["None"] = -1] = "None";
    VActionType[VActionType["Animation"] = 0] = "Animation";
    VActionType[VActionType["ShakeEffect"] = 4] = "ShakeEffect";
    VActionType[VActionType["Effect"] = 5] = "Effect";
    VActionType[VActionType["Custom"] = 999] = "Custom";
})(VActionType || (VActionType = {}));
export var BulletActionType;
(function (BulletActionType) {
    BulletActionType[BulletActionType["None"] = -1] = "None";
    BulletActionType[BulletActionType["IntrptState"] = 0] = "IntrptState";
    BulletActionType[BulletActionType["ChangeAttrs"] = 1] = "ChangeAttrs";
})(BulletActionType || (BulletActionType = {}));
export const STATE_ACTION_CTOR_MAP = new Map();
STATE_ACTION_CTOR_MAP.set(ActionType.ChangeAttrs, ActChangeAttrs);
STATE_ACTION_CTOR_MAP.set(ActionType.Velocity, ActVelocity);
STATE_ACTION_CTOR_MAP.set(ActionType.Shake, ActShake);
STATE_ACTION_CTOR_MAP.set(ActionType.Attack, ActAttack);
STATE_ACTION_CTOR_MAP.set(ActionType.Move, ActMove);
STATE_ACTION_CTOR_MAP.set(ActionType.Sprint, ActSprint);
STATE_ACTION_CTOR_MAP.set(ActionType.Timeup, ActIntrptTimeup);
STATE_ACTION_CTOR_MAP.set(ActionType.Collision, ActIntrptCollider);
STATE_ACTION_CTOR_MAP.set(ActionType.Input, ActIntrptInput);
export const V_STATE_ACTION_CTOR_MAP = new Map();
V_STATE_ACTION_CTOR_MAP.set(VActionType.Animation, VActAnimation);
V_STATE_ACTION_CTOR_MAP.set(VActionType.ShakeEffect, VActShakeEffect);
V_STATE_ACTION_CTOR_MAP.set(VActionType.Effect, VActEffect);
export const BULLET_ACTION_CTOR_MAP = new Map();
BULLET_ACTION_CTOR_MAP.set(BulletActionType.IntrptState, ActBulletIntrptState);
BULLET_ACTION_CTOR_MAP.set(BulletActionType.ChangeAttrs, ActBulletChangeAttrs);
