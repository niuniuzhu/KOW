import { IUIModule } from "./IUIModule";
import { Protos } from "../libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";

export class UIMatching implements IUIModule {
	private _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
	}

	public Exit(): void {
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	public OnConnectToBSError(): void {
		//进入失败重新匹配,暂时的处理方式
		UIAlert.Show("无法连接服务器", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
	}

	public OnBeginMatchResult(resp: Protos.CS2GC_BeginMatchRet): void {
		let error: string;
		switch (resp.result) {
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
			default:
				error = "匹配失败";
				break;
		}
		UIAlert.Show(error, () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
	}

	public OnLoginBSResut(resp: Protos.BS2GC_LoginRet): void {
		switch (resp.result) {
			case Protos.BS2GC_LoginRet.EResult.Success:
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