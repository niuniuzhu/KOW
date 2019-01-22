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
        Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
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
        const beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
        beginMatch.actorID = 0;
        Global.connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
            const resp = message;
            switch (resp.result) {
                case Protos.CS2GC_BeginMatchRet.EResult.Success:
                    this._maxPlayers = resp.maxPlayer;
                    for (let i = 0; i < resp.playerInfos.length; i++) {
                        const playerInfo = resp.playerInfos[i];
                        this._ui.OnPlayerJoin(playerInfo, i);
                        this._players.push(playerInfo);
                    }
                    Logger.Log("begin match");
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
                    this._ui.OnFail("无效网络ID", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
                    this._ui.OnFail("匹配失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                    this._ui.OnFail("玩家已在战场中", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
                    this._ui.OnFail("玩家已在匹配中", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                    break;
                case Protos.CS2GC_BeginMatchRet.EResult.Failed:
                    this._ui.OnFail("匹配失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
                    break;
            }
        });
    }
    OnEnterBattle(message) {
        const enterBattle = message;
        if (enterBattle.result != Protos.CS2GC_EnterBattle.Result.Success) {
            this._ui.OnEnterBattleResult(enterBattle.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
        }
        else {
            Global.sceneManager.ChangeState(SceneManager.State.Loading);
            Global.sceneManager.loading.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
        }
    }
}
