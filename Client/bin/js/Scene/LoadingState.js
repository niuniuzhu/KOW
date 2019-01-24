define(["require", "exports", "../Global", "../Libs/protos", "../Model/BattleInfo", "../Net/ProtoHelper", "../RC/Utils/Logger", "./SceneManager", "./SceneState"], function (require, exports, Global_1, protos_1, BattleInfo_1, ProtoHelper_1, Logger_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoadingState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.loading;
            this._battleInfo = new BattleInfo_1.BattleInfo();
        }
        ConnectToBS(gcNID, ip, port) {
            Global_1.Global.battleManager.AddListaners();
            const connector = Global_1.Global.connector.bsConnector;
            connector.onopen = () => {
                Logger_1.Logger.Log("BS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2BS_AskLogin();
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2BS_AskLogin, askLogin, message => {
                    const resp = message;
                    this._ui.OnLoginBSResut(resp.result, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    switch (resp.result) {
                        case protos_1.Protos.Global.ECommon.Success:
                            this._battleInfo.playerID = resp.playerID;
                            this._battleInfo.rndSeed = resp.rndSeed;
                            this._battleInfo.frameRate = resp.frameRate;
                            this._battleInfo.keyframeStep = resp.keyframeStep;
                            this._battleInfo.snapshotStep = resp.snapshotStep;
                            this._battleInfo.battleTime = resp.battleTime;
                            this._battleInfo.mapID = resp.mapID;
                            this._battleInfo.playerInfos = resp.playerInfos;
                            this._battleInfo.serverFrame = resp.curFrame;
                            Global_1.Global.battleManager.Start(this._battleInfo, this, () => {
                                this._ui.OnLoadComplete();
                                Global_1.Global.battleManager.SetBattleInfo(this._battleInfo, () => {
                                    Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Battle, this._battleInfo);
                                });
                            }, p => {
                                this._ui.OnLoadProgress(p);
                            });
                            break;
                    }
                });
            };
            if (Global_1.Global.local) {
                connector.Connect("localhost", port);
            }
            else {
                connector.Connect(ip, port);
            }
        }
    }
    exports.LoadingState = LoadingState;
});
//# sourceMappingURL=LoadingState.js.map