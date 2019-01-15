define(["require", "exports", "../Global", "../Libs/protos", "./UIAlert"], function (require, exports, Global_1, protos_1, UIAlert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UILogin {
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/login");
            this._root = fairygui.UIPackage.createObject("login", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._root.getChild("login_btn").onClick(this, this.OnLoginBtnClick);
            this._root.getChild("enter_btn").onClick(this, this.OnEnterBtnClick);
            this._areaList = this._root.getChild("alist").asList;
            this._areaList.on(fairygui.Events.CLICK_ITEM, this, this.OnAreaClick);
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
        BackToLogin() {
            this._root.getController("c1").selectedIndex = 0;
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
        OnEnterBtnClick() {
            let item = this._areaList.getChildAt(this._areaList.selectedIndex);
            let data = item.data["data"];
            fairygui.GRoot.inst.showModalWait();
            Global_1.Global.sceneManager.login.LoginGS(data.ip, data.port, data.password, item.data["gcNID"]);
        }
        OnAreaClick() {
        }
        OnRegisterResult(resp) {
            fairygui.GRoot.inst.closeModalWait();
            switch (resp.result) {
                case protos_1.Protos.LS2GC_AskRegRet.EResult.Success:
                    this._root.getChild("name").asTextField.text = this._root.getChild("reg_name").asTextField.text;
                    this._root.getController("c1").selectedIndex = 0;
                    UIAlert_1.UIAlert.Show("注册成功");
                    break;
                case protos_1.Protos.LS2GC_AskRegRet.EResult.Failed:
                    UIAlert_1.UIAlert.Show("注册失败", this.BackToLogin.bind(this));
                    break;
                case protos_1.Protos.LS2GC_AskRegRet.EResult.UnameExists:
                    UIAlert_1.UIAlert.Show("用户名已存在", this.BackToLogin.bind(this));
                    break;
                case protos_1.Protos.LS2GC_AskRegRet.EResult.UnameIllegal:
                    UIAlert_1.UIAlert.Show("无效的用户名", this.BackToLogin.bind(this));
                    break;
                case protos_1.Protos.LS2GC_AskRegRet.EResult.PwdIllegal:
                    UIAlert_1.UIAlert.Show("无效的密码", this.BackToLogin.bind(this));
                    break;
            }
        }
        OnLoginResut(resp) {
            fairygui.GRoot.inst.closeModalWait();
            switch (resp.result) {
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.Success:
                    this.HandleLoginLSSuccess(resp);
                    break;
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.Failed:
                    UIAlert_1.UIAlert.Show("登陆失败", this.BackToLogin.bind(this));
                    break;
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.InvalidUname:
                    UIAlert_1.UIAlert.Show("请输入正确的用户名", this.BackToLogin.bind(this));
                    break;
                case protos_1.Protos.LS2GC_AskLoginRet.EResult.InvalidPwd:
                    UIAlert_1.UIAlert.Show("请输入正确的密码", this.BackToLogin.bind(this));
                    break;
            }
        }
        OnConnectToLSError(e) {
            fairygui.GRoot.inst.closeModalWait();
            UIAlert_1.UIAlert.Show("无法连接服务器[" + e.toString() + "]", this.BackToLogin.bind(this));
        }
        HandleLoginLSSuccess(loginResult) {
            this._areaList.removeChildrenToPool();
            let count = loginResult.gsInfos.length;
            for (let i = 0; i < count; ++i) {
                let gsInfo = loginResult.gsInfos[i];
                let item = this._areaList.addItemFromPool().asButton;
                item.title = gsInfo.name;
                item.data = { "data": gsInfo, "gcNID": loginResult.sessionID };
            }
            if (count > 0)
                this._areaList.selectedIndex = 0;
            this._root.getController("c1").selectedIndex = 1;
        }
        OnConnectToGSError(e) {
            fairygui.GRoot.inst.closeModalWait();
            UIAlert_1.UIAlert.Show("无法连接服务器[" + e.toString() + "]", this.BackToLogin.bind(this));
        }
        OnLoginGSResult(resp) {
            fairygui.GRoot.inst.closeModalWait();
            switch (resp.result) {
                case protos_1.Protos.GS2GC_LoginRet.EResult.SessionExpire:
                    UIAlert_1.UIAlert.Show("登陆失败或凭证已过期", this.BackToLogin.bind(this));
                    break;
            }
        }
    }
    exports.UILogin = UILogin;
});
//# sourceMappingURL=UILogin.js.map