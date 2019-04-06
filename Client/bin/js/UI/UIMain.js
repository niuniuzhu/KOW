define(["require", "exports", "../Consts", "../Global", "../Libs/protos", "../RC/Crypto/MD5", "../RC/Utils/Base64 ", "../RC/Utils/Logger", "./UIAlert", "./UIRanking"], function (require, exports, Consts_1, Global_1, protos_1, MD5_1, Base64_1, Logger_1, UIAlert_1, UIRanking_1) {
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
            this._matchBtn = this._root.getChild("n3").asCom;
            this._matchBtn2 = this._root.getChild("n13").asCom;
            this._matchBtn3 = this._root.getChild("n19").asCom;
            this._matchBtn4 = this._root.getChild("n15").asCom;
            this._inviteBtn = this._root.getChild("n4").asCom;
            this._closeBtn = this._root.getChild("close_btn").asCom;
            this._matchBtn.onClick(this, this.OnMatchBtnClick);
            this._matchBtn2.onClick(this, this.OnMatchBtn2Click);
            this._matchBtn3.onClick(this, this.OnMatchBtn3Click);
            this._matchBtn4.onClick(this, this.OnMatchBtn4Click);
            this._inviteBtn.onClick(this, this.OnInviteBtnClick);
            this._closeBtn.onClick(this, this.OnCloseBtnClick);
            this._root.getChild("n22").asCom.onClick(this, this.OnRankingBtnClick);
        }
        Dispose() {
            this._ranking.dispose();
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
            this._matchBtn4.enabled = value;
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
            this.SetMatchBtnEnable(false);
            Global_1.Global.sceneManager.main.BeginMatch(protos_1.Protos.GC2CS_BeginMatch.EMode.T4P1);
        }
        OnMatchBtn4Click() {
            this.SetMatchBtnEnable(false);
            Global_1.Global.sceneManager.main.BeginMatch(protos_1.Protos.GC2CS_BeginMatch.EMode.T2P2);
        }
        OnInviteBtnClick() {
            if (Laya.Browser.onMiniGame) {
                const base64 = new Base64_1.Base64();
                const eQuery = `{"ukey"=${this._userInfo.ukey},"openID"=${this._userInfo.openID},action=invite}`;
                const crypto = MD5_1.Md5.hashStr(eQuery);
                wx.shareAppMessage({
                    title: `你的好友${this._userInfo.nickname}邀请你参与小游戏<角斗之王>的对战`,
                    imageUrl: "https://www.kow2019.com/g/res/basicprofile.png",
                    query: `q=${base64.encode(eQuery)}&s=${crypto}`,
                    imageUrlId: null
                });
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
        }
        OnFail(message, callback = null) {
            UIAlert_1.UIAlert.Show(message, callback);
        }
    }
    exports.UIMain = UIMain;
});
//# sourceMappingURL=UIMain.js.map