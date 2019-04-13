import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";

export class UIInviting extends fairygui.Window {
	private _cancelBtn: fairygui.GComponent;

	protected onInit(): void {
		this.contentPane = fairygui.UIPackage.createObject("main", "invating").asCom;
		this.modal = true;
		this._cancelBtn = this.contentPane.getChild("cancel_btn").asCom;
		this._cancelBtn.onClick(this, this.OnCancelBtnClick);
	}

	private OnCancelBtnClick(): void {
		const request = ProtoCreator.Q_GC2CS_LeaveRoom();
		Global.connector.SendToCS(Protos.GC2CS_LeaveRoom, request);
		this.hide();
	}
}