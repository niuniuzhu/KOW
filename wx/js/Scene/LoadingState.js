import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { BattleInfo } from "../Model/BattleInfo";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class LoadingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.loading;
        this._battleInfo = new BattleInfo();
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
    }
    OnEnterBattle(message) {
        const enterBattle = message;
        if (enterBattle.result != Protos.CS2GC_EnterBattle.Result.Success) {
            this._ui.OnEnterBattleResult(enterBattle.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
        }
        else {
            this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
        }
    }
    ConnectToBS(gcNID, ip, port) {
        const connector = Global.connector.bsConnector;
        connector.onerror = (e) => this._ui.OnConnectToBSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
        connector.onopen = () => {
            Logger.Log("BS Connected");
            const askLogin = ProtoCreator.Q_GC2BS_AskLogin();
            askLogin.sessionID = gcNID;
            connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
                const resp = message;
                this._ui.OnLoginBSResut(resp.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                switch (resp.result) {
                    case Protos.Global.ECommon.Success:
                        Global.battleManager.Start();
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
        if (Global.platform == Global.Platform.Editor) {
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
                urls.push({ url: "res/roles/" + Consts.ASSETS_ENTITY_PREFIX + playerInfo.actorID + ".atlas", type: Laya.Loader.ATLAS });
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
        Global.battleManager.SetBattleInfo(this._battleInfo, () => {
            Global.sceneManager.ChangeState(SceneManager.State.Battle);
        });
    }
}
