define(["require", "exports", "./SceneState", "../Model/BattleInfo", "../UI/UIManager", "../Net/Connector", "../Libs/protos", "../RC/Utils/Logger", "../Net/ProtoHelper", "../Env", "../Model/BattleManager"], function (require, exports, SceneState_1, BattleInfo_1, UIManager_1, Connector_1, protos_1, Logger_1, ProtoHelper_1, Env_1, BattleManager_1) {
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
            let enterBattle = message;
            if (enterBattle.error != protos_1.Protos.CS2GC_EnterBattle.Error.Success) {
                this._ui.OnEnterBattleResult(enterBattle.error);
            }
            else {
                let connector = Connector_1.Connector.bsConnector;
                connector.onerror = (e) => this._ui.OnConnectToBSError(e);
                connector.onopen = () => {
                    Logger_1.Logger.Log("BS Connected");
                    let askLogin = ProtoHelper_1.ProtoCreator.Q_GC2BS_AskLogin();
                    askLogin.sessionID = enterBattle.gcNID;
                    connector.Send(protos_1.Protos.GC2BS_AskLogin, askLogin, message => {
                        let resp = message;
                        this._ui.OnLoginBSResut(resp.result);
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
                    connector.Connect("localhost", enterBattle.port);
                }
                else {
                    connector.Connect(enterBattle.ip, enterBattle.port);
                }
            }
        }
        RequestSnapshot() {
            let requestState = ProtoHelper_1.ProtoCreator.Q_GC2BS_RequestSnapshot();
            requestState.frame = 0;
            Connector_1.Connector.SendToBS(protos_1.Protos.GC2BS_RequestSnapshot, requestState, msg => {
                let ret = msg;
                this._battleInfo.reqFrame = ret.reqFrame;
                this._battleInfo.curFrame = ret.curFrame;
                this._battleInfo.snapshot = ret.snapshot;
                this.LoadAssets();
            });
        }
        LoadAssets() {
            if (this._assetsLoadComplete) {
                this.PrepareBattle();
            }
            else {
                const urls = [];
                urls.push({ url: "res/ui/assets.bin", type: Laya.Loader.BUFFER });
                urls.push({ url: "res/ui/assets_atlas0.png", type: Laya.Loader.IMAGE });
                Laya.loader.load(urls, Laya.Handler.create(this, () => {
                    fairygui.UIPackage.addPackage("res/ui/assets");
                    this._assetsLoadComplete = true;
                    this.PrepareBattle();
                }));
            }
        }
        PrepareBattle() {
            BattleManager_1.BattleManager.instance.Init(this._battleInfo);
        }
    }
    exports.LoadingState = LoadingState;
});
//# sourceMappingURL=LoadingState.js.map