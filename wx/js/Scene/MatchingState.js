"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("../Global");
const protos_1 = require("../Libs/protos");
const Connector_1 = require("../Net/Connector");
const ProtoHelper_1 = require("../Net/ProtoHelper");
const Logger_1 = require("../RC/Utils/Logger");
const SceneManager_1 = require("./SceneManager");
const SceneState_1 = require("./SceneState");
class MatchingState extends SceneState_1.SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global_1.Global.uiManager.matching;
        Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
        Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
        Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
        Global_1.Global.connector.AddListener(Connector_1.Connector.ConnectorType.GS, protos_1.Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
    }
    OnEnter(param) {
        super.OnEnter(param);
        this._maxPlayers = 0;
        this._players = [];
        this.BeginMatch();
    }
    OnExit() {
        super.OnExit();
    }
    OnUpdateRoomInfo(message) {
        const roomInfo = message;
        this._ui.UpdateRoomInfo(roomInfo);
    }
    OnPlayerJoint(message) {
        const playerJoin = message;
        this._ui.OnPlayerJoin(playerJoin.playerInfo, this._players.length);
        this._players.push(playerJoin.playerInfo);
    }
    OnPlayerLeave(message) {
        const playerLeave = message;
        for (let i = 0; i < this._players.length; i++) {
            const player = this._players[i];
            if (player.gcNID == playerLeave.gcNID) {
                this._ui.OnPlayerLeave(i);
                this._players.splice(i, 1);
                return;
            }
        }
    }
    BeginMatch() {
        const beginMatch = ProtoHelper_1.ProtoCreator.Q_GC2CS_BeginMatch();
        beginMatch.actorID = 0;
        Global_1.Global.connector.SendToCS(protos_1.Protos.GC2CS_BeginMatch, beginMatch, message => {
            const resp = message;
            switch (resp.result) {
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Success:
                    this._maxPlayers = resp.maxPlayer;
                    for (let i = 0; i < resp.playerInfos.length; i++) {
                        const playerInfo = resp.playerInfos[i];
                        this._ui.OnPlayerJoin(playerInfo, i);
                        this._players.push(playerInfo);
                    }
                    Logger_1.Logger.Log("begin match");
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
                    this._ui.OnFail("无效网络ID", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
                    this._ui.OnFail("匹配失败", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                    this._ui.OnFail("玩家已在战场中", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
                    this._ui.OnFail("玩家已在匹配中", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
                case protos_1.Protos.CS2GC_BeginMatchRet.EResult.Failed:
                    this._ui.OnFail("匹配失败", () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
                    break;
            }
        });
    }
    OnEnterBattle(message) {
        const enterBattle = message;
        if (enterBattle.result != protos_1.Protos.CS2GC_EnterBattle.Result.Success) {
            this._ui.OnEnterBattleResult(enterBattle.result, () => Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Login));
        }
        else {
            Global_1.Global.sceneManager.ChangeState(SceneManager_1.SceneManager.State.Loading);
            Global_1.Global.sceneManager.loading.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
        }
    }
}
exports.MatchingState = MatchingState;
