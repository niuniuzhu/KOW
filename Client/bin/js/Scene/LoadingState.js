define(["require", "exports", "../AssetsManager", "../Consts", "../Global", "../Libs/protos", "../Model/BattleInfo", "../Net/ProtoHelper", "../RC/Utils/Logger", "./SceneManager", "./SceneState"], function (require, exports, AssetsManager_1, Consts_1, Global_1, protos_1, BattleInfo_1, ProtoHelper_1, Logger_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoadingState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.loading;
            this._battleInfo = new BattleInfo_1.BattleInfo();
        }
        ConnectToBS(gcNID, ip, port) {
            const connector = Global_1.Global.connector.bsConnector;
            connector.onerror = (e) => this._ui.OnConnectToBSError(e, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            connector.onopen = () => {
                Logger_1.Logger.Log("BS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2BS_AskLogin();
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2BS_AskLogin, askLogin, message => {
                    const resp = message;
                    this._ui.OnLoginBSResut(resp.result, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    switch (resp.result) {
                        case protos_1.Protos.Global.ECommon.Success:
                            Global_1.Global.battleManager.Start();
                            this._battleInfo.playerID = resp.playerID;
                            this._battleInfo.rndSeed = resp.rndSeed;
                            this._battleInfo.frameRate = resp.frameRate;
                            this._battleInfo.keyframeStep = resp.keyframeStep;
                            this._battleInfo.snapshotStep = resp.snapshotStep;
                            this._battleInfo.battleTime = resp.battleTime;
                            this._battleInfo.mapID = resp.mapID;
                            this._battleInfo.playerInfos = resp.playerInfos;
                            this._battleInfo.serverFrame = resp.curFrame;
                            this.LoadAssets(this._battleInfo);
                            break;
                    }
                });
            };
            if (Global_1.Global.platform == Global_1.Global.Platform.Editor) {
                connector.Connect("localhost", port);
            }
            else {
                connector.Connect(ip, port);
            }
        }
        LoadAssets(battleInfo) {
            const urls = [];
            const count = battleInfo.playerInfos.length;
            for (let i = 0; i < count; ++i) {
                const playerInfo = battleInfo.playerInfos[i];
                urls.push({ url: "res/roles/" + Consts_1.Consts.ASSETS_ENTITY_PREFIX + playerInfo.actorID + ".atlas", type: AssetsManager_1.AssetType.Atlas });
            }
            urls.push({ url: "res/ui/assets.bin", type: AssetsManager_1.AssetType.Binary });
            urls.push({ url: "res/ui/assets_atlas0.png", type: AssetsManager_1.AssetType.Image });
            AssetsManager_1.AssetsManager.LoadBatch(urls, this, () => {
                this._ui.OnLoadComplete();
                fairygui.UIPackage.addPackage("res/ui/assets");
                this.InitBattle();
            }, p => {
                this._ui.OnLoadProgress(p);
            });
        }
        InitBattle() {
            Global_1.Global.battleManager.SetBattleInfo(this._battleInfo, () => {
                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Battle);
            });
        }
    }
    exports.LoadingState = LoadingState;
});
//# sourceMappingURL=LoadingState.js.map