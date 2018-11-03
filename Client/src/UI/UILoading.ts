import { IUIModule } from "./IUIModule";
import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { Graphic } from "../Graphic";
import { Logger } from "../RC/Utils/Logger";

export class UILoading implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	private readonly _progressBar: fairygui.GProgressBar;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/loading");
		this._root = fairygui.UIPackage.createObject("loading", "Main").asCom;
		this._root.setSize(Graphic.uiRoot.width, Graphic.uiRoot.height);
		this._root.addRelation(Graphic.uiRoot, fairygui.RelationType.Size);
		this._progressBar = this._root.getChild("n0").asProgress;
		this._progressBar.max = 100;
		this._progressBar.value = 10;
	}

	public Dispose(): void {
		this._root.dispose();
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

	public OnEnterBattleResult(result: Protos.CS2GC_EnterBattle.Error, onConfirm: () => void): void {
		switch (result) {
			case Protos.CS2GC_EnterBattle.Error.Success:
				break;
			case Protos.CS2GC_EnterBattle.Error.BSLost:
			case Protos.CS2GC_EnterBattle.Error.BSNotFound:
			case Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
				UIAlert.Show("登录战场失败", onConfirm);
				break;
		}
	}

	public OnConnectToBSError(e: Event, onConfirm: () => void): void {
		UIAlert.Show("无法连接服务器[" + e.toString() + "]", onConfirm);
	}

	public OnLoginBSResut(result: Protos.Global.ECommon, onConfirm: () => void): void {
		switch (result) {
			case Protos.Global.ECommon.Success:
				break;
			default:
				UIAlert.Show("进入战场失败", onConfirm);
				break;
		}
	}

	public OnLoadProgress(p: number): void {
		this._progressBar.value= 10 + p * 90;
	}
}