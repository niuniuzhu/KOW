import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
export class UIMain {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/main");
        this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._matchBtn = this._root.getChild("n3").asCom;
        this._matchBtn2 = this._root.getChild("n13").asCom;
        this._matchBtn3 = this._root.getChild("n19").asCom;
        this._matchBtn4 = this._root.getChild("n15").asCom;
        this._matchBtn.onClick(this, this.OnMatchBtnClick);
        this._matchBtn2.onClick(this, this.OnMatchBtn2Click);
        this._matchBtn3.onClick(this, this.OnMatchBtn3Click);
        this._matchBtn4.onClick(this, this.OnMatchBtn4Click);
    }
    Dispose() {
        this._root.dispose();
    }
    Enter(param) {
        this.SetMatchBtnEnable(true);
        Global.graphic.uiRoot.addChild(this._root);
        const userInfo = param;
        if (userInfo != null) {
            this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = userInfo.avatar;
            this._root.getChild("nickname").asTextField.text = userInfo.nickname;
            let r = userInfo.rank - userInfo.rank % Consts.RANK_STEP;
            r = r < Consts.RANK_START ? Consts.RANK_START : r;
            this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
            this._root.getChild("rank").asTextField.text = "" + (userInfo.rank < 0 ? 0 : userInfo.rank);
        }
    }
    Exit() {
        Global.graphic.uiRoot.removeChild(this._root);
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
        Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T2P1);
    }
    OnMatchBtn2Click() {
        this.SetMatchBtnEnable(false);
        Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T1P1);
    }
    OnMatchBtn3Click() {
        this.SetMatchBtnEnable(false);
        Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T4P1);
    }
    OnMatchBtn4Click() {
        this.SetMatchBtnEnable(false);
        Global.sceneManager.main.BeginMatch(Protos.GC2CS_BeginMatch.EMode.T2P2);
    }
    OnFail(message, callback = null) {
        UIAlert.Show(message, callback);
    }
}
