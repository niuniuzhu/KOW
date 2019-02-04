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

	/**
	 * 构造函数
	 */
	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.matching;

		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_MatchState, this.OnMotchState.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_RemoveFromMatch, this.OnRemoveFromMatch.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
	}

	private OnMotchState(message: any): void {
		const msg = <Protos.CS2GC_MatchState>message;
		this._ui.UpdatePlayerInfos(msg.playerInfos);
	}

	private OnRemoveFromMatch(message: any): void {
		this._ui.SetCancelBtnEnable(true);
		Global.sceneManager.ChangeState(SceneManager.State.Main);
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
			if (!Global.sceneManager.loading.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port)) {
				this._ui.OnFail("连接服务器失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login, null, true));
			}
		}
	}
}