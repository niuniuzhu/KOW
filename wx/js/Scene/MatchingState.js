import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { SceneState } from "./SceneState";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";
export class MatchingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.matching;
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
    }
    OnEnter(param) {
        super.OnEnter(param);
        this._roomID = 0;
        this._mapID = 0;
        this._maxPlayers = 0;
        this._players = [];
        this.BeginMatch();
    }
    OnExit() {
        super.OnExit();
    }
    OnUpdate(dt) {
    }
    OnUpdateRoomInfo(message) {
        const roomInfo = message;
        this._ui.UpdateRoomInfo(roomInfo);
    }
    OnPlayerJoint(message) {
        const playerJoin = message;
        this._players.push(playerJoin.playerInfos);
        this._ui.UpdatePlayers(this._players);
        if (this._players.length == this._maxPlayers) {
            this._ui.HandleFullPlayer(() => SceneManager.ChangeState(SceneManager.State.Loading));
        }
    }
    OnPlayerLeave(message) {
        const playerLeave = message;
        for (let i = 0; i < this._players.length; i++) {
            const player = this._players[i];
            if (player.gcNID == playerLeave.gcNID) {
                this._players.splice(i, 1);
                this._ui.UpdatePlayers(this._players);
                return;
            }
        }
    }
    BeginMatch() {
        const beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
        beginMatch.actorID = 0;
        Connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
            const resp = message;
            this._ui.OnBeginMatchResult(resp.result);
            switch (resp.result) {
                case Protos.CS2GC_BeginMatchRet.EResult.Success:
                    this._roomID = resp.id;
                    this._mapID = resp.mapID;
                    this._maxPlayers = resp.maxPlayer;
                    for (let i = 0; i < resp.playerInfos.length; i++) {
                        const playerInfo = resp.playerInfos[i];
                        this._players.push(playerInfo);
                    }
                    this._ui.UpdatePlayers(this._players);
                    Logger.Log("begin match");
                    break;
            }
        });
    }
}
