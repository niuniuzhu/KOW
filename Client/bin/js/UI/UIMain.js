define(["require", "exports", "../Consts", "../Global", "../Libs/protos", "../RC/Utils/Logger", "./UIAlert", "./UIInviting", "./UIRanking"], function (require, exports, Consts_1, Global_1, protos_1, Logger_1, UIAlert_1, UIInviting_1, UIRanking_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        get root() { return this._root; }
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/main");
            this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._ranking = new UIRanking_1.UIRanking();
            this._invating = new UIInviting_1.UIInviting();
            this._matchBtn = this._root.getChild("n3").asCom;
            this._matchBtn2 = this._root.getChild("n13").asCom;
            this._matchBtn3 = this._root.getChild("n54").asCom;
            this._matchBtn4 = this._root.getChild("n55").asCom;
            this._inviteBtn = this._root.getChild("n4").asCom;
            this._closeBtn = this._root.getChild("close_btn").asCom;
            this._matchBtn.onClick(this, this.OnMatchBtnClick);
            this._matchBtn2.onClick(this, this.OnMatchBtn2Click);
            this._matchBtn3.onClick(this, this.OnMatchBtn3Click);
            this._matchBtn4.onClick(this, this.OnMatchBtn4Click);
            this._inviteBtn.onClick(this, this.OnInviteBtnClick);
            this._closeBtn.onClick(this, this.OnCloseBtnClick);
            if (!Laya.Browser.onWeiXin) {
                this._closeBtn.visible = false;
            }
            this._root.getChild("n22").asCom.onClick(this, this.OnRankingBtnClick);
        }
        Dispose() {
            this._ranking.dispose();
            this._invating.dispose();
            this._root.dispose();
        }
        Enter(param) {
            this.SetMatchBtnEnable(true);
            Global_1.Global.graphic.uiRoot.addChild(this._root);
            this._userInfo = param;
            if (this._userInfo != null) {
                this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = this._userInfo.avatar;
                this._root.getChild("nickname").asTextField.text = this._userInfo.nickname;
                let r = this._userInfo.rank - this._userInfo.rank % Consts_1.Consts.RANK_STEP;
                r = r < Consts_1.Consts.RANK_START ? Consts_1.Consts.RANK_START : r;
                this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
                this._root.getChild("rank").asTextField.text = "" + (this._userInfo.rank < 0 ? 0 : this._userInfo.rank);
            }
        }
        Exit() {
            fairygui.GRoot.inst.hidePopup(this._invating);
            Global_1.Global.graphic.uiRoot.removeChild(this._root);
            this._userInfo = null;
        }
        Update(dt) {
        }
        OnResize(e) {
        }
        UpdateRank(delta) {
            const rank = Number.parseInt(this._root.getChild("rank").asTextField.text) + delta;
            this._root.getChild("rank").asTextField.text = "" + (rank < 0 ? 0 : rank);
        }
        SetMatchBtnEnable(value) {
            this._matchBtn.enabled = value;
            this._matchBtn2.enabled = value;
            this._matchBtn3.enabled = value;
            this._matchBtn4.enabled = value;
        }
        ShowModalWait() {
            fairygui.GRoot.inst.showModalWait();
        }
        CloseModalWait() {
            fairygui.GRoot.inst.closeModalWait();
        }
        OnMatchBtnClick() {
            this.SetMatchBtnEnable(false);
            Global_1.Global.sceneManager.main.BeginMatch(protos_1.Protos.GC2CS_BeginMatch.EMode.T2P1);
        }
        OnMatchBtn2Click() {
            this.SetMatchBtnEnable(false);
            Global_1.Global.sceneManager.main.BeginMatch(protos_1.Protos.GC2CS_BeginMatch.EMode.T1P1);
        }
        OnMatchBtn3Click() {
            fairygui.GRoot.inst.showModalWait();
            Global_1.Global.sceneManager.main.TestCreateRoom();
        }
        OnMatchBtn4Click() {
            Global_1.Global.sceneManager.main.TestJoinRoom(Number.parseInt(this._root.getChild("n56").asTextInput.text));
        }
        OnInviteBtnClick() {
            if (Laya.Browser.onMiniGame) {
                fairygui.GRoot.inst.showModalWait();
                Global_1.Global.sceneManager.main.InviteFriend();
            }
            else {
                Logger_1.Logger.Log("wx function only");
            }
        }
        OnCloseBtnClick() {
            wx.exitMiniProgram({
                success: () => { },
                fail: () => {
                    Logger_1.Logger.Log("exit program failed");
                },
                complete: () => { }
            });
        }
        OnRankingBtnClick() {
            fairygui.GRoot.inst.showPopup(this._ranking);
            this._ranking.center();
        }
        OnFail(message, callback = null) {
            UIAlert_1.UIAlert.Show(message, callback);
        }
        ShowInvating() {
            fairygui.GRoot.inst.showPopup(this._invating);
            this._invating.center();
            this._invating.contentPane.getController("c1").selectedIndex = 0;
        }
        Showjoining() {
            fairygui.GRoot.inst.showPopup(this._invating);
            this._invating.center();
            this._invating.contentPane.getController("c1").selectedIndex = 1;
        }
    }
    exports.UIMain = UIMain;
});
//# sourceMappingURL=UIMain.js.map