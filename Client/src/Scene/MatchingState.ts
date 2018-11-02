import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { SceneState } from "./SceneState";
import { UIMatching } from "../UI/UIMatching";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "./SceneManager";

/**
 * 匹配状态
 */
export class MatchingState extends SceneState {
	private readonly _ui: UIMatching;
	private _roomID: number;
	private _mapID: number;
	private _maxPlayers: number;
	private _players: Protos.ICS2GC_PlayerInfo[];

	/**
	 * 构造函数
	 */
	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.matching;

		Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
		Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
		Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);

		this._roomID = 0;
		this._mapID = 0;
		this._maxPlayers = 0;
		this._players = [];

		this.BeginMatch();
	}

	protected OnExit(): void {
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
	}

	private OnUpdateRoomInfo(message: any): void {
		const roomInfo: Protos.CS2GC_RoomInfo = <Protos.CS2GC_RoomInfo>message;
		this._ui.UpdateRoomInfo(roomInfo);
	}

	private OnPlayerJoint(message: any): void {
		const playerJoin: Protos.CS2GC_PlayerJoin = <Protos.CS2GC_PlayerJoin>message;
		this._players.push(playerJoin.playerInfos);
		this._ui.UpdatePlayers(this._players);
		if (this._players.length == this._maxPlayers) {
			//满员后切换到加载资源状态
			this._ui.HandleFullPlayer(() => SceneManager.ChangeState(SceneManager.State.Loading));
		}
	}

	private OnPlayerLeave(message: any): void {
		const playerLeave: Protos.CS2GC_PlayerLeave = <Protos.CS2GC_PlayerLeave>message;
		for (let i = 0; i < this._players.length; i++) {
			const player = this._players[i];
			if (player.gcNID == playerLeave.gcNID) {
				this._players.splice(i, 1);
				this._ui.UpdatePlayers(this._players);
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
		Connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
			const resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			this._ui.OnBeginMatchResult(resp.result);
			switch (resp.result) {
				case Protos.CS2GC_BeginMatchRet.EResult.Success:
					//开始匹配成功
					//这里不用判断是否满员,下发的房间玩家里不包含自己,会在PlayerJoin消息里通知
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