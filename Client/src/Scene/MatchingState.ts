import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { SceneState } from "./SceneState";
import { UIMatching } from "../UI/UIMatching";

export class MatchingState extends SceneState {
	private _ui: UIMatching;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.matching;
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);

		Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BeginBattle, this.OnBeginBattle.bind(this));
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_UpdatePlayer, this.OnUpdatePlayerInfo.bind(this));
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));

		//请求匹配
		let beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		ProtoCreator.MakeTransMessage(beginMatch, Protos.MsgOpts.TransTarget.CS, 0);
		Connector.Send(Connector.ConnectorType.GS, Protos.GC2CS_BeginMatch, beginMatch, message => {
			let resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			console.log(resp);
		});
	}

	protected OnExit(): void {
		Connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BeginBattle, this.OnBeginBattle.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_UpdatePlayer, this.OnUpdatePlayerInfo.bind(this));
		Connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleStart, this.OnBattleStart.bind(this));
		super.OnExit();
	}

	protected OnUpdate(dt: number): void {
	}

	private OnBeginBattle(message: any): void {
		let beginBattle: Protos.CS2GC_BeginBattle = <Protos.CS2GC_BeginBattle>message;
		let connector = Connector.bsConnector;
		connector.onerror = () => this._ui.OnConnectToBSError();
		connector.onopen = () => {
			let askLogin = ProtoCreator.Q_GC2BS_AskLogin();
			askLogin.sessionID = beginBattle.gsNID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				let resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
				this._ui.OnLoginBSResut(resp);
			});
		}
		connector.Connect(beginBattle.ip, beginBattle.port);
	}

	private OnUpdatePlayerInfo(message: any): void {
		let updatePlayer: Protos.BS2GC_UpdatePlayer = <Protos.BS2GC_UpdatePlayer>message;
		this._ui.UpdatePlayerInfo(updatePlayer);
	}

	private OnBattleStart(message: any): void {
		let beginBattle: Protos.BS2GC_BattleStart = <Protos.BS2GC_BattleStart>message;
		//todo start battle
	}

	public OnLoadComplete(): void {
	}
}