define(["require", "exports", "./Logic/Actions/ActAttack", "./Logic/Actions/ActBulletChangeAttrs", "./Logic/Actions/ActBulletIntrptState", "./Logic/Actions/ActChangeAttrs", "./Logic/Actions/ActIntrptCollider", "./Logic/Actions/ActIntrptInput", "./Logic/Actions/ActIntrptTimeup", "./Logic/Actions/ActMove", "./Logic/Actions/ActSprint", "./Logic/Actions/ActVelocity", "./Logic/Actions/EntityAction", "./View/FSM/VActAnimation", "./View/FSM/VActEffect", "./View/FSM/VActShake"], function (require, exports, ActAttack_1, ActBulletChangeAttrs_1, ActBulletIntrptState_1, ActChangeAttrs_1, ActIntrptCollider_1, ActIntrptInput_1, ActIntrptTimeup_1, ActMove_1, ActSprint_1, ActVelocity_1, EntityAction_1, VActAnimation_1, VActEffect_1, VActShake_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StateType;
    (function (StateType) {
        StateType[StateType["Idle"] = 0] = "Idle";
        StateType[StateType["Move"] = 1] = "Move";
        StateType[StateType["Attack"] = 2] = "Attack";
        StateType[StateType["Shake"] = 3] = "Shake";
        StateType[StateType["Sprint"] = 4] = "Sprint";
        StateType[StateType["Attack3"] = 5] = "Attack3";
        StateType[StateType["Die"] = 6] = "Die";
        StateType[StateType["Attack2"] = 7] = "Attack2";
    })(StateType = exports.StateType || (exports.StateType = {}));
    var ActionType;
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
    })(ActionType = exports.ActionType || (exports.ActionType = {}));
    var VActionType;
    (function (VActionType) {
        VActionType[VActionType["None"] = -1] = "None";
        VActionType[VActionType["Animation"] = 0] = "Animation";
        VActionType[VActionType["Shake"] = 4] = "Shake";
        VActionType[VActionType["Effect"] = 5] = "Effect";
    })(VActionType = exports.VActionType || (exports.VActionType = {}));
    var BulletActionType;
    (function (BulletActionType) {
        BulletActionType[BulletActionType["None"] = -1] = "None";
        BulletActionType[BulletActionType["IntrptState"] = 0] = "IntrptState";
        BulletActionType[BulletActionType["ChangeAttrs"] = 1] = "ChangeAttrs";
    })(BulletActionType = exports.BulletActionType || (exports.BulletActionType = {}));
    exports.STATE_ACTION_CTOR_MAP = new Map();
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.ChangeAttrs, ActChangeAttrs_1.ActChangeAttrs);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Velocity, ActVelocity_1.ActVelocity);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Shake, EntityAction_1.EntityAction);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Attack, ActAttack_1.ActAttack);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Move, ActMove_1.ActMove);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Sprint, ActSprint_1.ActSprint);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Timeup, ActIntrptTimeup_1.ActIntrptTimeup);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Collision, ActIntrptCollider_1.ActIntrptCollider);
    exports.STATE_ACTION_CTOR_MAP.set(ActionType.Input, ActIntrptInput_1.ActIntrptInput);
    exports.V_STATE_ACTION_CTOR_MAP = new Map();
    exports.V_STATE_ACTION_CTOR_MAP.set(VActionType.Animation, VActAnimation_1.VActAnimation);
    exports.V_STATE_ACTION_CTOR_MAP.set(VActionType.Shake, VActShake_1.VActShake);
    exports.V_STATE_ACTION_CTOR_MAP.set(VActionType.Effect, VActEffect_1.VActEffect);
    exports.BULLET_ACTION_CTOR_MAP = new Map();
    exports.BULLET_ACTION_CTOR_MAP.set(BulletActionType.IntrptState, ActBulletIntrptState_1.ActBulletIntrptState);
    exports.BULLET_ACTION_CTOR_MAP.set(BulletActionType.ChangeAttrs, ActBulletChangeAttrs_1.ActBulletChangeAttrs);
});
//# sourceMappingURL=Defines.js.map