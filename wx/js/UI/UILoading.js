import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
export class UILoading {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/loading");
        this._root = fairygui.UIPackage.createObject("loading", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._progressBar = this._root.getChild("progress").asProgress;
        this._progressBar.max = 100;
        this._progressBar.value = 0;
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
    OnLoginBSResut(result, onConfirm) {
        switch (result) {
            case Protos.Global.ECommon.Success:
                break;
            default:
                UIAlert.Show("无法进入战场", onConfirm);
                break;
        }
    }
    OnLoadProgress(p) {
        this._progressBar.value = 10 + p * 90;
    }
    OnLoadComplete() {
        this._progressBar.value = 100;
    }
}
