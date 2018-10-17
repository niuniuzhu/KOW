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

	public OnLoginBSResut(resp: Protos.BS2GC_LoginRet): void {
		switch (resp.result) {
			case Protos.BS2GC_LoginRet.EResult.Success:
				this.UpdateMaoInfo(resp.mapID);
				this.UpdatePlayerInfos(resp.playInfos);
				this.StartLoad(resp.mapID, resp.playInfos);
				break;
			default:
				//进入失败重新匹配,暂时的处理方式
				UIAlert.Show("进入战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
				break;
		}
	}

	private UpdateMaoInfo(mapID: number): void {
	}

	private UpdatePlayerInfos(playInfos: Protos.ICS2BS_PlayerInfo[]): void {
	}

	public UpdatePlayerInfo(updatePlayer: Protos.BS2GC_UpdatePlayer): any {
	}

	private StartLoad(mapID: number, playInfos: Protos.ICS2BS_PlayerInfo[]): void {
		SceneManager.matching.OnLoadComplete();
	}
}