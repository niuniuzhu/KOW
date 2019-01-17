import { Global } from "../Global";

export class UIAlert {
	private static _com: fairygui.GComponent;
	private static _hideHandler: () => void;
	private static _isShowing;

	public static get isShowing(): boolean { return UIAlert._isShowing; }

	public static Show(content: string, removeHandler: () => void = null): void {
		if (null == UIAlert._com) {
			UIAlert._com = fairygui.UIPackage.createObject("global", "alert").asCom;
			UIAlert._com.getChild("confirm").onClick(null, this.OnConfirmBtnClick);
		}
		UIAlert._hideHandler = removeHandler;
		if (UIAlert._hideHandler != null)
			UIAlert._com.on(laya.events.Event.REMOVED, null, UIAlert.OnHide);
		fairygui.GRoot.inst.showPopup(UIAlert._com, Global.graphic.uiRoot);
		UIAlert._com.center();
		UIAlert._com.getChild("text").asTextField.text = content;
		UIAlert._isShowing = true;
	}

	private static OnConfirmBtnClick(): void {
		fairygui.GRoot.inst.hidePopup(UIAlert._com);
	}

	public static OnHide(): void {
		UIAlert._com.off(laya.events.Event.REMOVED, null, UIAlert.OnHide);
		UIAlert._isShowing = false;
		if (UIAlert._hideHandler != null)
			UIAlert._hideHandler();
	}
}