import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";
export class MatchingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = Global.uiManager.matching;
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
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
        this._ui.OnPlayerJoin(playerJoin.playerInfos);
        if (this._players.length == this._maxPlayers) {
            this._ui.HandleFullPlayer(() => Global.sceneManager.ChangeState(SceneManager.State.Loading));
        }
    }
    OnPlayerLeave(message) {
        const playerLeave = message;
        for (let i = 0; i < this._players.length; i++) {
            const player = this._players[i];
            if (player.gcNID == playerLeave.gcNID) {
                this._players.splice(i, 1);
                this._ui.OnPlayerLeave(player);
                return;
            }
        }
    }
    BeginMatch() {
        const beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
        beginMatch.actorID = 0;
        Global.connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
            const resp = message;
            this._ui.OnBeginMatchResult(resp.result);
            switch (resp.result) {
                case Protos.CS2GC_BeginMatchRet.EResult.Success:
                    this._maxPlayers = resp.maxPlayer;
                    for (let i = 0; i < resp.playerInfos.length; i++) {
                        const playerInfo = resp.playerInfos[i];
                        this._players.push(playerInfo);
                    }
                    Logger.Log("begin match");
                    break;
            }
        });
    }
}
