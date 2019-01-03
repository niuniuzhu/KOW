import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { UIMatching } from "../UI/UIMatching";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";

/**
 * 匹配状态
 */
export class MatchingState extends SceneState {
	private readonly _ui: UIMatching;
	private _maxPlayers: number;
	private _players: Protos.ICS2GC_PlayerInfo[];

	/**
	 * 构造函数
	 */
	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.matching;

		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);

		this._maxPlayers = 0;
		this._players = [];

		this.BeginMatch();
	}

	protected OnExit(): void {
		super.OnExit();
	}

	private OnUpdateRoomInfo(message: any): void {
		const roomInfo: Protos.CS2GC_RoomInfo = <Protos.CS2GC_RoomInfo>message;
		this._ui.UpdateRoomInfo(roomInfo);
	}

	private OnPlayerJoint(message: any): void {
		const playerJoin: Protos.CS2GC_PlayerJoin = <Protos.CS2GC_PlayerJoin>message;
		this._ui.OnPlayerJoin(playerJoin.playerInfos);
		// if (this._players.length == this._maxPlayers) {
		// 	//满员后切换到加载资源状态
		// 	this._ui.HandleFullPlayer(() => Global.sceneManager.ChangeState(SceneManager.State.Loading));
		// }
	}

	private OnPlayerLeave(message: any): void {
		const playerLeave: Protos.CS2GC_PlayerLeave = <Protos.CS2GC_PlayerLeave>message;
		for (let i = 0; i < this._players.length; i++) {
			const player = this._players[i];
			if (player.gcNID == playerLeave.gcNID) {
				this._players.splice(i, 1);
				this._ui.OnPlayerLeave(player);
				return;
			}
		}
	}

	/**
	 * 请求匹配
	 */
	private BeginMatch(): void {
		const beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		beginMatch.actorID = 0;//todo 使用的角色
		//请求CS开始匹配
		Global.connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
			const resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
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

	/**
	 * 服务端已准备好战场,客户端连接BS获取战场信息,并载入资源,获取快照,初始化战场
	 * @param message 协议
	 */
	private OnEnterBattle(message: any): void {
		const enterBattle: Protos.CS2GC_EnterBattle = <Protos.CS2GC_EnterBattle>message;
		if (enterBattle.result != Protos.CS2GC_EnterBattle.Result.Success) {
			this._ui.OnEnterBattleResult(enterBattle.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
		}
		else {
			Global.sceneManager.ChangeState(SceneManager.State.Loading);
			Global.sceneManager.loading.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
		}
	}
}