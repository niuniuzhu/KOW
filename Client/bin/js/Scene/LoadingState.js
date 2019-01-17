define(["require", "exports", "../AssetsManager", "../Consts", "../Global", "../Libs/protos", "../Model/BattleInfo", "../Model/CDefs", "../Net/ProtoHelper", "../RC/Utils/Hashtable", "../RC/Utils/Logger", "./SceneManager", "./SceneState"], function (require, exports, AssetsManager_1, Consts_1, Global_1, protos_1, BattleInfo_1, CDefs_1, ProtoHelper_1, Hashtable_1, Logger_1, SceneManager_1, SceneState_1) {
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
            if (Global_1.Global.local) {
                connector.Connect("localhost", port);
            }
            else {
                connector.Connect(ip, port);
            }
        }
        LoadAssets(battleInfo) {
            const urls = [];
            const mapDef = CDefs_1.CDefs.GetMap(battleInfo.mapID);
            const preloads = Hashtable_1.Hashtable.GetStringArray(mapDef, "preloads");
            for (const u of preloads) {
                const ss = u.split(",");
                urls.push({ url: "res/" + ss[0], type: ss[1] });
            }
            const count = battleInfo.playerInfos.length;
            for (let i = 0; i < count; ++i) {
                const playerInfo = battleInfo.playerInfos[i];
                urls.push({ url: "res/roles/" + Consts_1.Consts.ASSETS_MODEL_PREFIX + playerInfo.actorID + ".atlas", type: AssetsManager_1.AssetType.Atlas });
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
                Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Battle, this._battleInfo);
            });
        }
    }
    exports.LoadingState = LoadingState;
});
//# sourceMappingURL=LoadingState.js.map