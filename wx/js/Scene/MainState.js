"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SceneState_1 = require("./SceneState");
const Global_1 = require("../Global");
class MainState extends SceneState_1.SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global_1.Global.uiManager.main;
    }
}
exports.MainState = MainState;
