define(["require", "exports", "../Global", "../Libs/protos", "./UIAlert"], function (require, exports, Global_1, protos_1, UIAlert_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIMain {
        constructor() {
            fairygui.UIPackage.addPackage("res/ui/main");
            this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._matchBtn = this._root.getChild("n3").asCom;
            this._matchBtn2 = this._root.getChild("n13").asCom;
            this._matchBtn4 = this._root.getChild("n15").asCom;
            this._matchBtn.onClick(this, this.OnMatchBtnClick);
            this._matchBtn2.onClick(this, this.OnMatchBtn2Click);
            this._matchBtn4.onClick(this, this.OnMatchBtn4Click);
        }
        get root() { return this._root; }
        Dispose() {
            this._root.dispose();
        }
        Enter(param) {
            this.SetMatchBtnEnable(true);
            Global_1.Global.graphic.uiRoot.addChild(this._root);
            this._root.getTransition("t0").play();
            const userInfo = param;
            if (userInfo != null) {
                this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = userInfo.avatar;
                this._root.getChild("nickname").asTextField.text = userInfo.nickname;
                let r = userInfo.rank - userInfo.rank % UIMain.RANK_STEP;
                r = r < UIMain.RANK_START ? UIMain.RANK_START : r;
                this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
                this._root.getChild("rank").asTextField.text = "" + (userInfo.rank < 0 ? 0 : userInfo.rank);
            }
        }
        Exit() {
            Global_1.Global.graphic.uiRoot.removeChild(this._root);
        }
        Update(dt) {
        }
        OnResize(e) {
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
        OnMatchBtn4Click() {
            this.SetMatchBtnEnable(false);
            Global_1.Global.sceneManager.main.BeginMatch(protos_1.Protos.GC2CS_BeginMatch.EMode.T2P2);
        }
        OnFail(message, callback = null) {
            UIAlert_1.UIAlert.Show(message, callback);
        }
    }
    UIMain.RANK_STEP = 400;
    UIMain.RANK_START = 1200;
    exports.UIMain = UIMain;
});
//# sourceMappingURL=UIMain.js.map