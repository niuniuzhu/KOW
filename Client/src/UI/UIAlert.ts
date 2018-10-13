export class UIAlert {
	private static _com: fairygui.GComponent;
	private static _hideHandler: () => void;
	private static _isShowing;
	private static _isModal: boolean;//是否模态,是则无法被后者覆盖,优先于scour

	public static get isShowing(): boolean { return UIAlert._isShowing; }

	public static Show(content: string, removeHandler: () => void = null, isModal:boolean = false, scour:boolean = true): void {
		if ( UIAlert._isShowing && (UIAlert._isModal || !scour) ){
			return;
		}
		if (null == UIAlert._com) {
			UIAlert._com = fairygui.UIPackage.createObject("global", "alert").asCom;
		}
		UIAlert._hideHandler = removeHandler;
		if (UIAlert._hideHandler != null)
			UIAlert._com.on(laya.events.Event.REMOVED, null, UIAlert.OnHide);
		fairygui.GRoot.inst.showPopup(UIAlert._com);
		UIAlert._com.center();
		UIAlert._com.getChild("text").asTextField.text = content;
		UIAlert._isShowing = true;
		UIAlert._isModal = isModal;
	}

	public static OnHide(): void {
		UIAlert._com.off(laya.events.Event.REMOVED, null, UIAlert.OnHide);
		UIAlert._isShowing = false;
		UIAlert._isModal = false;
		UIAlert._hideHandler();
	}
}