"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("../Global");
const protos_1 = require("../Libs/protos");
const BattleInfo_1 = require("../Model/BattleInfo");
const ProtoHelper_1 = require("../Net/ProtoHelper");
const Logger_1 = require("../RC/Utils/Logger");
const SceneManager_1 = require("./SceneManager");
const SceneState_1 = require("./SceneState");
class LoadingState extends SceneState_1.SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global_1.Global.uiManager.loading;
        this._battleInfo = new BattleInfo_1.BattleInfo();
    }
    ConnectToBS(gcNID, ip, port) {
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
