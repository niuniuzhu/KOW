import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { UIAlert } from "./UIAlert";
import { UIInviting } from "./UIInviting";
import { UIRanking } from "./UIRanking";
export class UIMain {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/main");
        this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._ranking = new UIRanking();
        this._invating = new UIInviting();
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
        this._root.getChild("n22").asCom.onClick(this, this.OnRankingBtnClick);
    }
    Dispose() {
        this._ranking.dispose();
        this._invating.dispose();
        this._root.dispose();
    }
    Enter(param) {
        this.SetMatchBtnEnable(true);
        Global.graphic.uiRoot.addChild(this._root);
        this._userInfo = param;
        if (this._userInfo != null) {
            this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = this._userInfo.avatar;
            this._root.getChild("nickname").asTextField.text = this._userInfo.nickname;
            let r = this._userInfo.rank - this._userInfo.rank % Consts.RANK_STEP;
            r = r < Consts.RANK_START ? Consts.RANK_START : r;
            this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
            this._root.getChild("rank").asTextField.text = "" + (this._userInfo.rank < 0 ? 0 : this._userInfo.rank);
        }
    }
    Exit() {
        fairygui.GRoot.inst.hidePopup(this._invating);
        Global.graphic.uiRoot.removeChild(this._root);
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
        Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T2P1);
    }
    OnMatchBtn2Click() {
        this.SetMatchBtnEnable(false);
        Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T1P1);
    }
    OnMatchBtn3Click() {
        this.SetMatchBtnEnable(false);
        fairygui.GRoot.inst.showModalWait();
        Global.sceneManager.main.TestCreateRoom();
    }
    OnMatchBtn4Click() {
        this.SetMatchBtnEnable(false);
    }
    OnInviteBtnClick() {
        if (Laya.Browser.onMiniGame) {
            fairygui.GRoot.inst.showModalWait();
            Global.sceneManager.main.InviteFriend();
        }
        else {
            Logger.Log("wx function only");
        }
    }
    OnCloseBtnClick() {
        wx.exitMiniProgram({
            success: () => { },
            fail: () => {
                Logger.Log("exit program failed");
            },
            complete: () => { }
        });
    }
    OnRankingBtnClick() {
        fairygui.GRoot.inst.showPopup(this._ranking);
    }
    OnFail(message, callback = null) {
        UIAlert.Show(message, callback);
    }
    ShowInvating() {
        this._invating.getController("c1").selectedIndex = 0;
        fairygui.GRoot.inst.showPopup(this._invating);
    }
    Showjoining() {
        this._invating.getController("c1").selectedIndex = 1;
        fairygui.GRoot.inst.showPopup(this._invating);
    }
}
