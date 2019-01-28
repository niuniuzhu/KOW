define(["require", "exports", "../Global"], function (require, exports, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIAlert {
        static get isShowing() { return this._com.parent != null; }
        static Show(content, removeHandler = null) {
            if (null == this._com) {
                this._com = fairygui.UIPackage.createObject("global", "alert").asCom;
                this._com.getChild("confirm").onClick(null, this.OnConfirmBtnClick);
            }
            this._hideHandler = removeHandler;
            if (this._hideHandler != null)
                this._com.on(laya.events.Event.REMOVED, null, this.OnHide.bind(this));
            if (!this.isShowing) {
                fairygui.GRoot.inst.showPopup(this._com, Global_1.Global.graphic.uiRoot);
                this._com.center();
            }
            this._com.getChild("text").asTextField.text = content;
        }
        static OnConfirmBtnClick() {
            fairygui.GRoot.inst.hidePopup(this._com);
        }
        static OnHide() {
            this._com.off(laya.events.Event.REMOVED, null, this.OnHide.bind(this));
            if (this._hideHandler != null)
                this._hideHandler();
        }
    }
    exports.UIAlert = UIAlert;
});
//# sourceMappingURL=UIAlert.js.map