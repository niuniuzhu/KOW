define(["require", "exports", "../UI/UIManager", "../Net/Connector", "../Libs/protos", "../Net/ProtoHelper", "./SceneState", "../RC/Utils/Logger", "./SceneManager", "./PreloadInstance", "../Env"], function (require, exports, UIManager_1, Connector_1, protos_1, ProtoHelper_1, SceneState_1, Logger_1, SceneManager_1, PreloadInstance_1, Env_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MatchingState extends SceneState_1.SceneState {
        constructor(type) {
            super(type);
            this.__ui = this._ui = UIManager_1.UIManager.matching;
        }
        OnEnter(param) {
            super.OnEnter(param);
            this._roomID = 0;
            this._mapID = 0;
            this._maxPlayers = 0;
            this._players = [];
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
            Connector_1.Connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
            this.BeginMatch();
        }
        OnExit() {
            Connector_1.Connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
            Connector_1.Connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
            Connector_1.Connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
            Connector_1.Connector.RemoveListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
            super.OnExit();
        }
        OnUpdate(dt) {
        }
        OnUpdateRoomInfo(message) {
            let roomInfo = message;
            this._ui.UpdateRoomInfo(roomInfo);
        }
        OnPlayerJoint(message) {
            let playerJoin = message;
            this._players.push(playerJoin.playerInfos);
            this._ui.UpdatePlayers(this._players);
            if (this._players.length == this._maxPlayers) {
                this.StartLoad(this._mapID, this._players);
            }
        }
        OnPlayerLeave(message) {
            let playerLeave = message;
            for (let i = 0; i < this._players.length; i++) {
                const player = this._players[i];
                if (player.gcNID == playerLeave.gcNID) {
                    this._players.splice(i, 1);
                    this._ui.UpdatePlayers(this._players);
                    return;
                }
            }
        }
        OnEnterBattle(message) {
            let enterBattle = message;
            if (enterBattle.error != protos_1.Protos.CS2GC_EnterBattle.Error.Success) {
                this._ui.OnEnterBattleResult(enterBattle.error);
            }
            else {
                let connector = Connector_1.Connector.bsConnector;
                connector.onerror = () => this._ui.OnConnectToBSError();
                connector.onopen = () => {
                    Logger_1.Logger.Log("BS Connected");
                    let askLogin = ProtoHelper_1.ProtoCreator.Q_GC2BS_AskLogin();
                    askLogin.sessionID = enterBattle.gcNID;
                    connector.Send(protos_1.Protos.GC2BS_AskLogin, askLogin, message => {
                        let resp = message;
                        this._ui.OnLoginBSResut(resp.result);
                        switch (resp.result) {
                            case protos_1.Protos.Global.ECommon.Success:
                                SceneManager_1.SceneManager.ChangeState(SceneManager_1.SceneManager.State.Battle, resp);
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
        BeginMatch() {
            let beginMatch = ProtoHelper_1.ProtoCreator.Q_GC2CS_BeginMatch();
            beginMatch.actorID = 0;
            Connector_1.Connector.SendToCS(protos_1.Protos.GC2CS_BeginMatch, beginMatch, message => {
                let resp = message;
                this._ui.OnBeginMatchResult(resp.result);
                switch (resp.result) {
                    case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Success:
                        this._roomID = resp.id;
                        this._mapID = resp.mapID;
                        this._maxPlayers = resp.maxPlayer;
                        for (let i = 0; i < resp.playerInfos.length; i++) {
                            const playerInfo = resp.playerInfos[i];
                            this._players.push(playerInfo);
                        }
                        this._ui.UpdatePlayers(this._players);
                        Logger_1.Logger.Log("begin match");
                        break;
                }
            });
        }
        StartLoad(mapID, playerInfos) {
            Logger_1.Logger.Log("instancing");
            PreloadInstance_1.PreloadInstance.Load(mapID, playerInfos, this.OnInstancingComplete);
        }
        OnInstancingComplete() {
            Logger_1.Logger.Log("instancing complete");
            let msg = ProtoHelper_1.ProtoCreator.Q_GC2CS_UpdatePlayerInfo();
            msg.progress = 100;
            Connector_1.Connector.SendToCS(protos_1.Protos.GC2CS_UpdatePlayerInfo, msg);
        }
    }
    exports.MatchingState = MatchingState;
});
//# sourceMappingURL=MatchingState.js.map