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
			UIAlert.Show(error, () => SceneManager.ChangeState(SceneManager.State.Login));
		}
	}

	public UpdateRoomInfo(roomInfo: Protos.CS2GC_RoomInfo): void {
		//todo update ui
	}

	public OnPlayerJoin(player: Protos.ICS2GC_PlayerInfo): void {
	}

	public OnPlayerLeave(player: Protos.ICS2GC_PlayerInfo): void {
	}

	public HandleFullPlayer(completeHandler: () => void): void {
		completeHandler();
	}
}