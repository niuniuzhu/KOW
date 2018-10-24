import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { SceneState } from "./SceneState";
import { Debug } from "../Misc/Debug";
export class MatchingState extends SceneState {
    constructor(type) {
        super(type);
        this.__ui = this._ui = UIManager.matching;
    }
    OnEnter(param) {
        super.OnEnter(param);
        this._roomID = 0;
        this._mapID = 0;
        this._maxPlayers = 0;
        this._players = [];
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
        Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
        this.BeginMatch();
    }
    OnExit() {
        Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
        Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
        Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
        Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
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
        if (enterBattle.error != Protos.CS2GC_EnterBattle.Error.Success) {
            this._ui.OnEnterBattleResult(enterBattle.error);
        }
        else {
            let connector = Connector.bsConnector;
            connector.onerror = () => this._ui.OnConnectToBSError();
            connector.onopen = () => {
                Debug.Log("BS Connected");
                let askLogin = ProtoCreator.Q_GC2BS_AskLogin();
                askLogin.sessionID = enterBattle.gcNID;
                connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
                    let resp = message;
                    this._ui.OnLoginBSResut(resp.result);
                });
            };
            connector.Connect(enterBattle.ip, enterBattle.port);
        }
    }
    BeginMatch() {
        let beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
        beginMatch.actorID = 0;
        Connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
            let resp = message;
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
                    Debug.Log("begin match");
                    break;
            }
        });
    }
    StartLoad(mapID, playInfos) {
        Debug.Log("start load");
        this.OnLoadComplete();
    }
    OnLoadComplete() {
        let msg = ProtoCreator.Q_GC2CS_UpdatePlayerInfo();
        msg.progress = 100;
        Connector.SendToCS(Protos.GC2CS_UpdatePlayerInfo, msg);
    }
}
//# sourceMappingURL=MatchingState.js.map