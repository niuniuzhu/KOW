define(["require", "exports", "../Global", "../Libs/protos", "../Net/ProtoHelper", "../RC/Utils/Logger", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, ProtoHelper_1, Logger_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MainState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.main;
        }
        BeginMatch(mode) {
            const beginMatch = ProtoHelper_1.ProtoCreator.Q_GC2CS_BeginMatch();
            beginMatch.mode = mode;
            beginMatch.actorID = 0;
            Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_BeginMatch, beginMatch, message => {
                const resp = message;
                switch (resp.result) {
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Success:
                        this._ui.SetMatchBtnEnable(true);
                        Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Matching);
                        Logger_1.Logger.Log("begin match");
                        break;
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Failed:
                        this._ui.OnFail("匹配失败", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                        break;
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                        this._ui.OnFail("玩家已在战场中", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                        break;
                }
            });
        }
    }
    exports.MainState = MainState;
});
//# sourceMappingURL=MainState.js.map