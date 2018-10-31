import { IUIModule } from "./IUIModule";
import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";
import { Graphic } from "../Graphic";

export class UIMatching implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/matching");
		this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
		this._root.setSize(Graphic.uiRoot.width, Graphic.uiRoot.height);
		this._root.addRelation(Graphic.uiRoot, fairygui.RelationType.Size);
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
		Graphic.uiRoot.addChild(this._root);
	}

	public Exit(): void {
		Graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	public OnConnectToBSError(): void {
		//进入失败重新匹配,暂时的处理方式
		UIAlert.Show("无法连接服务器", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
	}

	public OnBeginMatchResult(result: Protos.CS2GC_BeginMatchRet.EResult): void {
		let error: string = "";
		switch (result) {
			case Protos.CS2GC_BeginMatchRet.EResult.Success:
				break;
			case Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
				error = "无效网络ID";
				break;
			case Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
				error = "匹配失败";
				break;
			case Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
				error = "玩家已在战场中";
				break;
			case Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
				error = "玩家已在匹配中";
				break;
			case Protos.CS2GC_BeginMatchRet.EResult.Failed:
				error = "匹配失败";
				break;
		}
		if (error != "") {
			UIAlert.Show(error, () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
		}
	}

	public OnEnterBattleResult(result: Protos.CS2GC_EnterBattle.Error): void {
		switch (result) {
			case Protos.CS2GC_EnterBattle.Error.Success:
				break;
			case Protos.CS2GC_EnterBattle.Error.BSLost:
			case Protos.CS2GC_EnterBattle.Error.BSNotFound:
			case Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
				UIAlert.Show("登录战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
				break;
		}
	}

	public OnLoginBSResut(result: Protos.Global.ECommon): void {
		switch (result) {
			case Protos.Global.ECommon.Success:
				break;
			default:
				//进入失败重新匹配,暂时的处理方式
				UIAlert.Show("进入战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
				break;
		}
	}

	public UpdateRoomInfo(roomInfo: Protos.CS2GC_RoomInfo): void {
		//todo update ui
	}

	public UpdatePlayers(_players: Protos.ICS2GC_PlayerInfo[]): void {
	}
}