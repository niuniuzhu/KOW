import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";
import { ProtoCreator } from "../Net/ProtoHelper";

export class UIMatching implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	private readonly _tLists: fairygui.GList[] = [];
	private readonly _cancelBtn: fairygui.GButton;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/matching");
		this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._tLists.push(this._root.getChild("t0").asList);
		this._tLists.push(this._root.getChild("t1").asList);
		this._cancelBtn = this._root.getChild("cancel_btn").asButton;
		this._cancelBtn.onClick(this, this.OnCancelBtnClick);
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
		Global.graphic.uiRoot.addChild(this._root);
	}

	public Exit(): void {
		this.ClearPlayerInfos();
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	public SetCancelBtnEnable(value: boolean): void {
		this._cancelBtn.enabled = value;
	}

	private ClearPlayerInfos():void{
		for (const list of this._tLists) {
			list.removeChildrenToPool();
		}
	}

	private OnCancelBtnClick(): void {
		this.SetCancelBtnEnable(false);
		const request = ProtoCreator.Q_GC2CS_CancelMatch();
		Global.connector.SendToCS(Protos.GC2CS_CancelMatch, request);
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

	public OnFail(message: string, callback: () => void = null): void {
		UIAlert.Show(message, callback);
	}

	public UpdatePlayerInfos(playerInfos: Protos.ICS2GC_PlayerInfo[]): void {
		this.ClearPlayerInfos();
		const count = playerInfos.length;
		for (let i = 0; i < count; ++i) {
			const playerInfo = playerInfos[i];
			if (!playerInfo.vaild)
				continue;
			const list = this._tLists[playerInfo.team];
			const item = list.addItem().asCom;
			item.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = playerInfo.avatar;
			item.getChild("nickname").asTextField.text = playerInfo.nickname;
		}
	}
}