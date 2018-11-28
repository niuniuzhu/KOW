define(["require", "exports", "../Global"], function (require, exports, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIAlert {
        static get isShowing() { return UIAlert._isShowing; }
        static Show(content, removeHandler = null) {
            if (null == UIAlert._com) {
                UIAlert._com = fairygui.UIPackage.createObject("global", "alert").asCom;
            }
            UIAlert._hideHandler = removeHandler;
            if (UIAlert._hideHandler != null)
                UIAlert._com.on(laya.events.Event.REMOVED, null, UIAlert.OnHide);
            fairygui.GRoot.inst.showPopup(UIAlert._com, Global_1.Global.graphic.uiRoot);
            UIAlert._com.center();
            UIAlert._com.getChild("text").asTextField.text = content;
            UIAlert._isShowing = true;
        }
        static OnHide() {
            UIAlert._com.off(laya.events.Event.REMOVED, null, UIAlert.OnHide);
            UIAlert._isShowing = false;
            UIAlert._hideHandler();
        }
    }
    exports.UIAlert = UIAlert;
});
//# sourceMappingURL=UIAlert.js.map