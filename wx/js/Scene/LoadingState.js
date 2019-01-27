import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { BattleInfo } from "../Model/BattleInfo";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class LoadingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.loading;
        this._battleInfo = new BattleInfo();
    }
    ConnectToBS(gcNID, ip, port) {
        if (Global.connector.bsConnector.connected) {
            return false;
        }
        Global.battleManager.Init();
        const connector = Global.connector.bsConnector;
        connector.onopen = () => {
            Logger.Log("BS Connected");
            const askLogin = ProtoCreator.Q_GC2BS_AskLogin();
            askLogin.sessionID = gcNID;
            connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
                const resp = message;
                this._ui.OnLoginBSResut(resp.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                switch (resp.result) {
                    case Protos.Global.ECommon.Success:
                        this._battleInfo.playerID = resp.playerID;
                        this._battleInfo.rndSeed = resp.rndSeed;
                        this._battleInfo.frameRate = resp.frameRate;
                        this._battleInfo.keyframeStep = resp.keyframeStep;
                        this._battleInfo.snapshotStep = resp.snapshotStep;
                        this._battleInfo.battleTime = resp.battleTime;
                        this._battleInfo.mapID = resp.mapID;
                        this._battleInfo.playerInfos = resp.playerInfos;
                        this._battleInfo.serverFrame = resp.curFrame;
                        Global.battleManager.Preload(this._battleInfo, this, () => {
                            this._ui.OnLoadComplete();
                            Global.battleManager.SetBattleInfo(this._battleInfo, () => {
                                Global.sceneManager.ChangeState(SceneManager.State.Battle, this._battleInfo);
                            });
                        }, p => {
                            this._ui.OnLoadProgress(p);
                        });
                        break;
                }
            });
        };
        if (Global.local) {
            connector.Connect("localhost", port);
        }
        else {
            connector.Connect(ip, port);
        }
        return true;
    }
}
