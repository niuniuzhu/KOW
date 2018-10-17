import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { SceneState } from "./SceneState";
import { UIMatching } from "../UI/UIMatching";
import { SceneManager } from "./SceneManager";

export class MatchingState extends SceneState {
	private _ui: UIMatching;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.matching;
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);

		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eCS2GC_BSInfo, this.OnRecvBSInfo.bind(this));

		//请求匹配
		let beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		ProtoCreator.MakeTransMessage(beginMatch, Protos.MsgOpts.TransTarget.CS, 0);
		beginMatch.actorID = 0;//todo 使用的角色
		Connector.Send(Connector.ConnectorType.GS, Protos.GC2CS_BeginMatch, beginMatch, message => {
			let resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			console.log(resp);
		});
	}

	protected OnExit(): void {
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eCS2GC_RoomInfo, this.OnUpdateRoomInfo.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eCS2GC_BSInfo, this.OnRecvBSInfo.bind(this));
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
	}

	private OnUpdateRoomInfo(message: any): void {
		let roomInfo: Protos.CS2GC_RoomInfo = <Protos.CS2GC_RoomInfo>message;
		this._ui.UpdateRoomInfo(roomInfo);
		if (roomInfo.isFull) {
			this.StartLoad(roomInfo.mapID, roomInfo.playerInfos);
		}
	}

	private StartLoad(mapID: number, playInfos: Protos.IRoom_PlayerInfo[]): void {
		//todo preloadall
		SceneManager.matching.OnLoadComplete();
	}

	private OnRecvBSInfo(message: any): void {
		let bsInfo: Protos.CS2GC_BSInfo = <Protos.CS2GC_BSInfo>message;
		let connector = Connector.bsConnector;
		connector.onerror = () => this._ui.OnConnectToBSError();
		connector.onopen = () => {
			let askLogin = ProtoCreator.Q_GC2BS_AskLogin();
			askLogin.sessionID = bsInfo.gcNID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				let resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
				this._ui.OnLoginBSResut(resp);
			});
		}
		connector.Connect(bsInfo.ip, bsInfo.port);
	}

	public OnLoadComplete(): void {
	}
}