import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
var Mode;
(function (Mode) {
    Mode[Mode["WXLogin"] = 0] = "WXLogin";
    Mode[Mode["WebLogin"] = 1] = "WebLogin";
})(Mode || (Mode = {}));
export class UILogin {
    constructor() {
        this._mode = Mode.WXLogin;
        fairygui.UIPackage.addPackage("res/ui/login");
        this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
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
        Global.graphic.uiRoot.addChild(this._root);
    }
    Exit() {
        Global.graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnLoginBtnClick() {
        let uname = this._root.getChild("name").asTextField.text;
        if (uname == "") {
            UIAlert.Show("无效用户名");
            return;
        }
        fairygui.GRoot.inst.showModalWait();
        Global.sceneManager.login.Login(uname);
    }
    OnLoginResut(resp, callback) {
        fairygui.GRoot.inst.closeModalWait();
        switch (resp.result) {
            case Protos.LS2GC_AskLoginRet.EResult.Failed:
                UIAlert.Show("登陆失败", callback);
                break;
            case Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
                UIAlert.Show("无效用户名", callback);
                break;
        }
    }
    OnFail(message, callback = null) {
        UIAlert.Show(message, callback);
    }
    ModalWait(value) {
        if (value)
            fairygui.GRoot.inst.showModalWait();
        else
            fairygui.GRoot.inst.closeModalWait();
    }
}
UILogin.Mode = Mode;
