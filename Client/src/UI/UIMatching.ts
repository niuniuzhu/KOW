import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { SceneManager } from "../Scene/SceneManager";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";

export class UIMatching implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/matching");
		this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
		Global.graphic.uiRoot.addChild(this._root);
	}

	public Exit(): void {
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
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
			UIAlert.Show(error, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
		}
	}

	public OnEnterBattleResult(result: Protos.CS2GC_EnterBattle.Result, onConfirm: () => void): void {
		switch (result) {
			case Protos.CS2GC_EnterBattle.Result.Success:
				break;
			case Protos.CS2GC_EnterBattle.Result.BSLost:
			case Protos.CS2GC_EnterBattle.Result.BSNotFound:
			case Protos.CS2GC_EnterBattle.Result.BattleCreateFailed:
				UIAlert.Show("登录战场失败", onConfirm);
				break;
		}
	}

	public UpdateRoomInfo(roomInfo: Protos.CS2GC_RoomInfo): void {
		//todo update ui
	}

	public OnPlayerJoin(player: Protos.ICS2GC_PlayerInfo): void {
	}

	public OnPlayerLeave(player: Protos.ICS2GC_PlayerInfo): void {
	}
}