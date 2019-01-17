define(["require", "exports", "../Global", "../Libs/protos", "./UIAlert"], function (require, exports, Global_1, protos_1, UIAlert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Mode;
    (function (Mode) {
        Mode[Mode["WXLogin"] = 0] = "WXLogin";
        Mode[Mode["WebLogin"] = 1] = "WebLogin";
    })(Mode || (Mode = {}));
    class UILogin {
        constructor() {
            this._mode = Mode.WXLogin;
            fairygui.UIPackage.addPackage("res/ui/login");
            this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
        }
        set mode(value) {
            if (this._mode == value)
                return;
            this._mode = value;
            switch (this._mode) {
                case Mode.WXLogin:
                    this._root.getController("c1").selectedIndex = 0;
                    break;
                case Mode.WebLogin:
                    this._root.getController("c1").selectedIndex = 1;
                    break;
            }
        }
        onInit() {
        }
        Dispose() {
            this._root.dispose();
        }
        Enter(param) {
            Global_1.Global.graphic.uiRoot.addChild(this._root);
        }
        Exit() {
            Global_1.Global.graphic.uiRoot.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        OnLoginBtnClick() {
            let uname = this._root.getChild("name").asTextField.text;
            if (uname == "") {
                UIAlert_1.UIAlert.Show("无效用户名");
                return;
            }
            fairygui.GRoot.inst.showModalWait();
            Global_1.Global.sceneManager.login.Login(uname);
        }
        OnLoginResut(resp, callback) {
            fairygui.GRoot.inst.closeModalWait();
            switch (resp.result) {
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.Failed:
                    UIAlert_1.UIAlert.Show("登陆失败", callback);
                    break;
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
                    UIAlert_1.UIAlert.Show("请输入正确的用户名", callback);
                    break;
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
                    UIAlert_1.UIAlert.Show("请输入正确的密码", callback);
                    break;
            }
        }
        OnFail(message, callback = null) {
            UIAlert_1.UIAlert.Show(message, callback);
        }
        ModalWait(value) {
            if (value)
                fairygui.GRoot.inst.showModalWait();
            else
                fairygui.GRoot.inst.closeModalWait();
        }
    }
    UILogin.Mode = Mode;
    exports.UILogin = UILogin;
});
//# sourceMappingURL=UILogin.js.map