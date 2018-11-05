import { Global } from "../Global";
export class UIAlert {
    static get isShowing() { return UIAlert._isShowing; }
    static Show(content, removeHandler = null, isModal = false, scour = true) {
        if (UIAlert._isShowing && (UIAlert._isModal || !scour)) {
            return;
        }
        if (null == UIAlert._com) {
            UIAlert._com = fairygui.UIPackage.createObject("global", "alert").asCom;
        }
        UIAlert._hideHandler = removeHandler;
        if (UIAlert._hideHandler != null)
            UIAlert._com.on(laya.events.Event.REMOVED, null, UIAlert.OnHide);
        fairygui.GRoot.inst.showPopup(UIAlert._com, Global.graphic.uiRoot);
        UIAlert._com.center();
        UIAlert._com.getChild("text").asTextField.text = content;
        UIAlert._isShowing = true;
        UIAlert._isModal = isModal;
    }
    static OnHide() {
        UIAlert._com.off(laya.events.Event.REMOVED, null, UIAlert.OnHide);
        UIAlert._isShowing = false;
        UIAlert._isModal = false;
        UIAlert._hideHandler();
    }
}
