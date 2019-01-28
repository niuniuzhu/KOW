import { Global } from "../Global";

export class UIAlert {
	private static _com: fairygui.GComponent;
	private static _hideHandler: () => void;

	public static get isShowing(): boolean { return this._com.parent != null; }

	public static Show(content: string, removeHandler: () => void = null): void {
		if (null == this._com) {
			this._com = fairygui.UIPackage.createObject("global", "alert").asCom;
			this._com.getChild("confirm").onClick(null, this.OnConfirmBtnClick);
		}
		this._hideHandler = removeHandler;
		if (this._hideHandler != null)
			this._com.on(laya.events.Event.REMOVED, null, this.OnHide.bind(this));
		if (!this.isShowing) {
			fairygui.GRoot.inst.showPopup(this._com, Global.graphic.uiRoot);
			this._com.center();
		}
		this._com.getChild("text").asTextField.text = content;
	}

	private static OnConfirmBtnClick(): void {
		fairygui.GRoot.inst.hidePopup(this._com);
	}

	public static OnHide(): void {
		this._com.off(laya.events.Event.REMOVED, null, this.OnHide.bind(this));
		if (this._hideHandler != null)
			this._hideHandler();
	}
}