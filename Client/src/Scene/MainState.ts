import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { UIMain } from "../UI/UIMain";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";

export class MainState extends SceneState {
	private readonly _ui: UIMain;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.main;
	}

	/**
	 * 请求匹配
	 */
	public BeginMatch(mode: Protos.GC2CS_BeginMatch.EMode): void {
		const beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		beginMatch.mode = mode;
		beginMatch.actorID = 0;//todo 使用的角色
		//请求CS开始匹配
		Global.connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
			const resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			switch (resp.result) {
				case Protos.CS2GC_BeginMatchRet.EResult.Success:
					this._ui.SetMatchBtnEnable(true);
					Global.sceneManager.ChangeState(SceneManager.State.Matching);
					Logger.Log("begin match");
					break;
				case Protos.CS2GC_BeginMatchRet.EResult.Failed:
					this._ui.OnFail("匹配失败", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
					break;
				case Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
					this._ui.OnFail("玩家已在战场中", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
					break;
			}
		});
	}
}