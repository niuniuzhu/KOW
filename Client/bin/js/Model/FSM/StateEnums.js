define(["require", "exports", "./ActAutoState", "./ActEntityAttrs", "./ActStateAttrs", "./ActVelocity", "./ActVelocityAcceleration"], function (require, exports, ActAutoState_1, ActEntityAttrs_1, ActStateAttrs_1, ActVelocity_1, ActVelocityAcceleration_1) {
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
    var StateOp;
    (function (StateOp) {
        StateOp[StateOp["Equal"] = 0] = "Equal";
        StateOp[StateOp["Add"] = 1] = "Add";
        StateOp[StateOp["Mul"] = 2] = "Mul";
        StateOp[StateOp["Mod"] = 3] = "Mod";
        StateOp[StateOp["Pow"] = 4] = "Pow";
        StateOp[StateOp["Exp"] = 5] = "Exp";
    })(StateOp = exports.StateOp || (exports.StateOp = {}));
    var StateAttr;
    (function (StateAttr) {
        StateAttr[StateAttr["DisableMove"] = 1] = "DisableMove";
        StateAttr[StateAttr["DisableTurn"] = 2] = "DisableTurn";
        StateAttr[StateAttr["SuperArmor"] = 4] = "SuperArmor";
        StateAttr[StateAttr["Invulnerability"] = 8] = "Invulnerability";
        StateAttr[StateAttr["ClearLastBullets"] = 16] = "ClearLastBullets";
    })(StateAttr = exports.StateAttr || (exports.StateAttr = {}));
    exports.ID_TO_STATE_ACTION = new Map();
    exports.ID_TO_STATE_ACTION.set(0, ActAutoState_1.ActAutoState);
    exports.ID_TO_STATE_ACTION.set(1, ActVelocity_1.ActVelocity);
    exports.ID_TO_STATE_ACTION.set(2, ActVelocityAcceleration_1.ActVelocityAcceleration);
    exports.ID_TO_STATE_ACTION.set(3, ActEntityAttrs_1.ActEntityAttrs);
    exports.ID_TO_STATE_ACTION.set(4, ActStateAttrs_1.ActStateAttrs);
});
//# sourceMappingURL=StateEnums.js.map