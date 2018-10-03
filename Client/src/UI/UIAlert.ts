export class UIAlert {
	private static _com: fairygui.GComponent;
	private static _handler: () => void;

	public static Show(content: string, removeHandler: () => void = null): void {
		if (null == UIAlert._com) {
			UIAlert._com = fairygui.UIPackage.createObject("global", "alert").asCom;
		}
		UIAlert._handler = removeHandler;
		if (UIAlert._handler != null)
			UIAlert._com.on(laya.events.Event.REMOVED, null, UIAlert.RemoveHandler);
		fairygui.GRoot.inst.showPopup(UIAlert._com);
		UIAlert._com.center();
		UIAlert._com.getChild("text").asTextField.text = content;
	}

	public static RemoveHandler(): void {
		UIAlert._com.off(laya.events.Event.REMOVED, null, UIAlert.RemoveHandler);
		UIAlert._handler();
	}
}