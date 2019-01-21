"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("../Global");
const SceneState_1 = require("./SceneState");
class BattleState extends SceneState_1.SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global_1.Global.uiManager.battle;
    }
    OnEnter(param) {
        super.OnEnter(param);
    }
    OnExit() {
        super.OnExit();
    }
    OnUpdate(dt) {
        super.OnUpdate(dt);
    }
}
exports.BattleState = BattleState;
