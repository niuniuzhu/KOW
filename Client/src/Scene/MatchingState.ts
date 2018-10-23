import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { SceneState } from "./SceneState";
import { UIMatching } from "../UI/UIMatching";
import { Debug } from "../Misc/Debug";

export class MatchingState extends SceneState {
	private readonly _ui: UIMatching;
	private _roomID: number;
	private _mapID: number;
	private _maxPlayers: number;
	private _players: Protos.ICS2GC_PlayerInfo[];

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.matching;
	}

	protected OnEnter(param: any): void {
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

	protected OnExit(): void {
		Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerJoin, this.OnPlayerJoint.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_PlayerLeave, this.OnPlayerLeave.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
	}

	private OnUpdateRoomInfo(message: any): void {
		let roomInfo: Protos.CS2GC_RoomInfo = <Protos.CS2GC_RoomInfo>message;
		this._ui.UpdateRoomInfo(roomInfo);
	}

	private OnPlayerJoint(message: any): void {
		let playerJoin: Protos.CS2GC_PlayerJoin = <Protos.CS2GC_PlayerJoin>message;
		this._players.push(playerJoin.playerInfos);
		this._ui.UpdatePlayers(this._players);
		//是否满员
		if (this._players.length == this._maxPlayers) {
			this.StartLoad(this._mapID, this._players);
		}
	}

	private OnPlayerLeave(message: any): void {
		let playerLeave: Protos.CS2GC_PlayerLeave = <Protos.CS2GC_PlayerLeave>message;
		for (let i = 0; i < this._players.length; i++) {
			const player = this._players[i];
			if (player.gcNID == playerLeave.gcNID) {
				this._players.splice(i, 1);
				this._ui.UpdatePlayers(this._players);
				return;
			}
		}
	}

	//cs下发bs的连接信息
	private OnEnterBattle(message: any): void {
		let enterBattle: Protos.CS2GC_EnterBattle = <Protos.CS2GC_EnterBattle>message;
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
					let resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
					this._ui.OnLoginBSResut(resp.result);
				});
			}
			//todo 这里最好用kcp连接
			connector.Connect(enterBattle.ip, enterBattle.port);
		}
	}

	//请求匹配
	private BeginMatch(): void {
		let beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		beginMatch.actorID = 0;//todo 使用的角色
		Connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
			let resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
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

	private StartLoad(mapID: number, playInfos: Protos.ICS2GC_PlayerInfo[]): void {
		//todo preloadall
		Debug.Log("start load");
		this.OnLoadComplete();
	}

	//通知cs加载完成
	public OnLoadComplete(): void {
		let msg = ProtoCreator.Q_GC2CS_UpdatePlayerInfo();
		msg.progress = 100;
		Connector.SendToCS(Protos.GC2CS_UpdatePlayerInfo, msg);
	}
}