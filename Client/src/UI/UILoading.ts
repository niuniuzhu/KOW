import { IUIModule } from "./IUIModule";
import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";

export class UILoading implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
	}

	public Exit(): void {
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	public OnEnterBattleResult(result: Protos.CS2GC_EnterBattle.Error): void {
		switch (result) {
			case Protos.CS2GC_EnterBattle.Error.Success:
				break;
			case Protos.CS2GC_EnterBattle.Error.BSLost:
			case Protos.CS2GC_EnterBattle.Error.BSNotFound:
			case Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
				UIAlert.Show("登录战场失败", () => SceneManager.ChangeState(SceneManager.State.Login));
				break;
		}
	}

	public OnConnectToBSError(e: Event): void {
		UIAlert.Show("无法连接服务器[" + e.toString() + "]", () => SceneManager.ChangeState(SceneManager.State.Login));
	}

	public OnLoginBSResut(result: Protos.Global.ECommon): void {
		switch (result) {
			case Protos.Global.ECommon.Success:
				break;
			default:
				UIAlert.Show("进入战场失败", () => SceneManager.ChangeState(SceneManager.State.Login));
				break;
		}
	}
}