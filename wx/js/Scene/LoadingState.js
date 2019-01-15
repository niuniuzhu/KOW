import { AssetsManager, AssetType } from "../AssetsManager";
import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { BattleInfo } from "../Model/BattleInfo";
import { CDefs } from "../Model/CDefs";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Hashtable } from "../RC/Utils/Hashtable";
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
        if (Global.local) {
            connector.Connect("localhost", port);
        }
        else {
            connector.Connect(ip, port);
        }
    }
    LoadAssets(battleInfo) {
        const urls = [];
        const mapDef = CDefs.GetMap(battleInfo.mapID);
        const preloads = Hashtable.GetStringArray(mapDef, "preloads");
        for (const u of preloads) {
            const ss = u.split(",");
            urls.push({ url: "res/" + ss[0], type: ss[1] });
        }
        const count = battleInfo.playerInfos.length;
        for (let i = 0; i < count; ++i) {
            const playerInfo = battleInfo.playerInfos[i];
            urls.push({ url: "res/roles/" + Consts.ASSETS_MODEL_PREFIX + playerInfo.actorID + ".atlas", type: AssetType.Atlas });
        }
        urls.push({ url: "res/ui/assets.bin", type: AssetType.Binary });
        urls.push({ url: "res/ui/assets_atlas0.png", type: AssetType.Image });
        AssetsManager.LoadBatch(urls, this, () => {
            this._ui.OnLoadComplete();
            fairygui.UIPackage.addPackage("res/ui/assets");
            this.InitBattle();
        }, p => {
            this._ui.OnLoadProgress(p);
        });
    }
    InitBattle() {
        Global.battleManager.SetBattleInfo(this._battleInfo, () => {
            Global.sceneManager.ChangeState(SceneManager.State.Battle);
        });
    }
}
