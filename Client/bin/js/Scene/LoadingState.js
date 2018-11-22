define(["require", "exports", "../Consts", "../Global", "../Libs/protos", "../Model/BattleInfo", "../Net/Connector", "../Net/ProtoHelper", "../RC/Utils/Logger", "./SceneManager", "./SceneState"], function (require, exports, Consts_1, Global_1, protos_1, BattleInfo_1, Connector_1, ProtoHelper_1, Logger_1, SceneManager_1, SceneState_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoadingState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = Global_1.Global.uiManager.loading;
            this._battleInfo = new BattleInfo_1.BattleInfo();
            Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
        }
        OnEnterBattle(message) {
            const enterBattle = message;
            if (enterBattle.result != protos_1.Protos.CS2GC_EnterBattle.Result.Success) {
                this._ui.OnEnterBattleResult(enterBattle.result, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            }
            else {
                this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
            }
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
            if (this._assetsLoadComplete) {
                this.InitBattle();
            }
            else {
                const urls = [];
                const count = battleInfo.playerInfos.length;
                for (let i = 0; i < count; ++i) {
                    const playerInfo = battleInfo.playerInfos[i];
                    urls.push({ url: "res/roles/" + Consts_1.Consts.ASSETS_ENTITY_PREFIX + playerInfo.actorID + ".atlas", type: Laya.Loader.ATLAS });
                }
                urls.push({ url: "res/ui/assets.bin", type: Laya.Loader.BUFFER });
                urls.push({ url: "res/ui/assets_atlas0.png", type: Laya.Loader.IMAGE });
                Laya.loader.load(urls, Laya.Handler.create(this, () => {
                    fairygui.UIPackage.addPackage("res/ui/assets");
                    this._assetsLoadComplete = true;
                    this.InitBattle();
                }), new laya.utils.Handler(this, p => {
                    this._ui.OnLoadProgress(p);
                }));
            }
        }
        InitBattle() {
            Global_1.Global.battleManager.SetBattleInfo(this._battleInfo, () => {
                Logger_1.Logger.Log("battle start");
                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Battle);
            });
        }
    }
    exports.LoadingState = LoadingState;
});
//# sourceMappingURL=LoadingState.js.map