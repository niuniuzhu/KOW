import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { IUIModule } from "./IUIModule";
import { UIAlert } from "./UIAlert";

export class UIMatching implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	private readonly _images: fairygui.GComponent[] = [];
	private readonly _nicknames: fairygui.GTextField[] = [];

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/matching");
		this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._images.push(this._root.getChild("image0").asCom);
		this._images.push(this._root.getChild("image1").asCom);
		this._nicknames.push(this._root.getChild("nickname0").asTextField);
		this._nicknames.push(this._root.getChild("nickname1").asTextField);
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

	public UpdateRoomInfo(roomInfo: Protos.CS2GC_RoomInfo): void {
		//todo update ui
	}

	public OnPlayerJoin(playerInfo: Protos.ICS2GC_PlayerInfo, index: number): void {
		this._images[index].getChild("loader").asCom.getChild("icon").asLoader.url = playerInfo.avatar;
		this._nicknames[index].text = playerInfo.nickname;
	}

	public OnPlayerLeave(index: number): void {
		this._images[index].getChild("loader").asCom.getChild("icon").asLoader.url = "";
		this._nicknames[index].text = "";
	}
}