import { SceneState } from "./SceneState";
import { BattleInfo } from "../Model/BattleInfo";
import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Env } from "../Env";
import { BattleManager } from "../Model/BattleManager";
import { SceneManager } from "./SceneManager";
export class LoadingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.loading;
        this._battleInfo = new BattleInfo();
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
    }
    OnEnterBattle(message) {
        const enterBattle = message;
        if (enterBattle.error != Protos.CS2GC_EnterBattle.Error.Success) {
            this._ui.OnEnterBattleResult(enterBattle.error, () => SceneManager.ChangeState(SceneManager.State.Login));
        }
        else {
            this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
        }
    }
    ConnectToBS(gcNID, ip, port) {
        const connector = Connector.bsConnector;
        connector.onerror = (e) => this._ui.OnConnectToBSError(e, () => SceneManager.ChangeState(SceneManager.State.Login));
        connector.onopen = () => {
            Logger.Log("BS Connected");
            const askLogin = ProtoCreator.Q_GC2BS_AskLogin();
            askLogin.sessionID = gcNID;
            connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
                const resp = message;
                this._ui.OnLoginBSResut(resp.result, () => SceneManager.ChangeState(SceneManager.State.Login));
                switch (resp.result) {
                    case Protos.Global.ECommon.Success:
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
        if (Env.platform == Env.Platform.Editor) {
            connector.Connect("localhost", port);
        }
        else {
            connector.Connect(ip, port);
        }
    }
    RequestSnapshot() {
        const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
        requestState.frame = 0;
        Connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
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
            }), new laya.utils.Handler(this, p => {
                this._ui.OnLoadProgress(p);
            }));
        }
    }
    InitBattle() {
        BattleManager.instance.Init(this._battleInfo, () => {
            SceneManager.ChangeState(SceneManager.State.Battle);
        });
    }
}
