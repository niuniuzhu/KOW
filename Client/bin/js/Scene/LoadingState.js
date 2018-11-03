define(["require", "exports", "./SceneState", "../Model/BattleInfo", "../UI/UIManager", "../Net/Connector", "../Libs/protos", "../RC/Utils/Logger", "../Net/ProtoHelper", "../Env", "../Model/BattleManager", "./SceneManager"], function (require, exports, SceneState_1, BattleInfo_1, UIManager_1, Connector_1, protos_1, Logger_1, ProtoHelper_1, Env_1, BattleManager_1, SceneManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoadingState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_1.UIManager.loading;
            this._battleInfo = new BattleInfo_1.BattleInfo();
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
        }
        OnEnterBattle(message) {
            const enterBattle = message;
            if (enterBattle.error != protos_1.Protos.CS2GC_EnterBattle.Error.Success) {
                this._ui.OnEnterBattleResult(enterBattle.error, () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            }
            else {
                this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
            }
        }
        ConnectToBS(gcNID, ip, port) {
            const connector = Connector_1.Connector.bsConnector;
            connector.onerror = (e) => this._ui.OnConnectToBSError(e, () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
            connector.onopen = () => {
                Logger_1.Logger.Log("BS Connected");
                const askLogin = ProtoHelper_1.ProtoCreator.Q_GC2BS_AskLogin();
                askLogin.sessionID = gcNID;
                connector.Send(protos_1.Protos.GC2BS_AskLogin, askLogin, message => {
                    const resp = message;
                    this._ui.OnLoginBSResut(resp.result, () => SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    switch (resp.result) {
                        case protos_1.Protos.Global.ECommon.Success:
                            this._battleInfo.rndSeed = resp.rndSeed;
                            this._battleInfo.frameRate = resp.frameRate;
                            this._battleInfo.keyframeStep = resp.keyframeStep;
                            this._battleInfo.battleTime = resp.battleTime;
                            this._battleInfo.mapID = resp.mapID;
                            this.RequestSnapshot();
                            break;
                    }
                });
            };
            if (Env_1.Env.platform == Env_1.Env.Platform.Editor) {
                connector.Connect("localhost", port);
            }
            else {
                connector.Connect(ip, port);
            }
        }
        RequestSnapshot() {
            const requestState = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestSnapshot();
            requestState.frame = 0;
            Connector_1.Connector.SendToBS(protos_1.Protos.GC2BS_RequestSnapshot, requestState, msg => {
                const ret = msg;
                this._battleInfo.reqFrame = ret.reqFrame;
                this._battleInfo.serverFrame = ret.curFrame;
                this._battleInfo.snapshot = ret.snapshot;
                this.LoadAssets();
            });
        }
        LoadAssets() {
            if (this._assetsLoadComplete) {
                this.InitBattle();
            }
            else {
                const urls = [];
                urls.push({ url: "res/ui/assets.bin", type: Laya.Loader.BUFFER });
                urls.push({ url: "res/ui/assets_atlas0.png", type: Laya.Loader.IMAGE });
                Laya.loader.load(urls, Laya.Handler.create(this, () => {
                    fairygui.UIPackage.addPackage("res/ui/assets");
                    this._assetsLoadComplete = true;
                    this.InitBattle();
                }));
            }
        }
        InitBattle() {
            BattleManager_1.BattleManager.instance.Init(this._battleInfo, () => {
            });
        }
    }
    exports.LoadingState = LoadingState;
});
//# sourceMappingURL=LoadingState.js.map