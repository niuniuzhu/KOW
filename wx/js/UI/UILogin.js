import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";
export class UILogin extends fairygui.Window {
    constructor() {
        super();
        fairygui.UIPackage.addPackage("res/ui/login");
    }
    onInit() {
        this.contentPane = fairygui.UIPackage.createObject("login", "Main").asCom;
        this.contentPane.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
        this.contentPane.getChild("reg_btn").onClick(this, this.OnRegBtnClick);
        this.contentPane.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
        this._areaList = this.contentPane.getChild("alist").asList;
        this._areaList.on(fairygui.Events.CLICK_ITEM, this, this.OnAreaClick);
    }
    Dispose() {
        this.contentPane.dispose();
        this.contentPane = null;
        this.dispose();
    }
    Enter() {
        this.show();
        this.center();
        this.BackToLogin();
    }
    Exit() {
        this.hide();
    }
    AnimIn() {
    }
    AnimOut() {
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    BackToRegister() {
        this.contentPane.getController("c1").selectedIndex = 1;
    }
    BackToLogin() {
        this.contentPane.getController("c1").selectedIndex = 0;
    }
    OnRegBtnClick() {
        let regName = this.contentPane.getChild("reg_name").asTextField.text;
        if (regName == "") {
            UIAlert.Show("无效的用户名");
            return;
        }
        this.showModalWait();
        SceneManager.login.RequestRegister(regName, 0, 0);
    }
    OnLoginBtnClick() {
        let uname = this.contentPane.getChild("name").asTextField.text;
        if (uname == "") {
            UIAlert.Show("无效用户名");
            return;
        }
        this.showModalWait();
        SceneManager.login.RequestLogin(uname, 0, 0);
    }
    OnEnterBtnClick() {
        let item = this._areaList.getChildAt(this._areaList.selectedIndex);
        let data = item.data["data"];
        this.showModalWait();
        SceneManager.login.RequestLoginGS(data.ip, data.port, data.password, item.data["sid"]);
    }
    OnAreaClick() {
    }
    OnRegisterResult(resp) {
        this.closeModalWait();
        switch (resp.result) {
            case Protos.LS2GC_AskRegRet.EResult.Success:
                this.contentPane.getChild("name").asTextField.text = this.contentPane.getChild("reg_name").asTextField.text;
                this.contentPane.getController("c1").selectedIndex = 0;
                UIAlert.Show("注册成功");
                break;
            case Protos.LS2GC_AskRegRet.EResult.Failed:
                UIAlert.Show("注册失败", this.BackToRegister.bind(this));
                break;
            case Protos.LS2GC_AskRegRet.EResult.UnameExists:
                UIAlert.Show("用户名已存在", this.BackToRegister.bind(this));
                break;
            case Protos.LS2GC_AskRegRet.EResult.UnameIllegal:
                UIAlert.Show("无效的用户名", this.BackToRegister.bind(this));
                break;
            case Protos.LS2GC_AskRegRet.EResult.PwdIllegal:
                UIAlert.Show("无效的密码", this.BackToRegister.bind(this));
                break;
        }
    }
    OnLoginResut(resp) {
        this.closeModalWait();
        switch (resp.result) {
            case Protos.LS2GC_AskLoginRet.EResult.Success:
                this.HandleLoginLSSuccess(resp);
                break;
            case Protos.LS2GC_AskLoginRet.EResult.Failed:
                UIAlert.Show("登陆失败", this.BackToLogin.bind(this));
                break;
            case Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
                UIAlert.Show("请输入正确的用户名", this.BackToLogin.bind(this));
                break;
            case Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
                UIAlert.Show("请输入正确的密码", this.BackToLogin.bind(this));
                break;
        }
    }
    OnConnectToLSError(e, confirmCallback) {
        UIAlert.Show("无法连接服务器[" + e.toString() + "]", confirmCallback);
    }
    HandleLoginLSSuccess(loginResult) {
        this._areaList.removeChildrenToPool();
        let count = loginResult.gsInfos.length;
        for (let i = 0; i < count; ++i) {
            let gsInfo = loginResult.gsInfos[i];
            let item = this._areaList.addItemFromPool().asButton;
            item.title = gsInfo.name;
            item.data = { "data": gsInfo, "sid": loginResult.sessionID };
        }
        if (count > 0)
            this._areaList.selectedIndex = 0;
        this.contentPane.getController("c1").selectedIndex = 2;
    }
    OnConnectToGSError() {
        this.closeModalWait();
        UIAlert.Show("无法连接服务器", this.BackToLogin.bind(this));
    }
    OnLoginGSResult(resp) {
        this.closeModalWait();
        switch (resp.result) {
            case Protos.GS2GC_LoginRet.EResult.SessionExpire:
                UIAlert.Show("登陆失败或凭证已过期", this.BackToLogin.bind(this));
                break;
        }
    }
}
