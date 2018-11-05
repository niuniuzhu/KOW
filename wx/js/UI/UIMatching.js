import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";
import { Global } from "../Global";
export class UIMatching {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/matching");
        this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
    }
    Dispose() {
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
    OnBeginMatchResult(result) {
        let error = "";
        switch (result) {
            case Protos.CS2GC_BeginMatchRet.EResult.Success:
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.IllegalID:
                error = "无效网络ID";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.NoRoom:
                error = "匹配失败";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.UserInBattle:
                error = "玩家已在战场中";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.UserInRoom:
                error = "玩家已在匹配中";
                break;
            case Protos.CS2GC_BeginMatchRet.EResult.Failed:
                error = "匹配失败";
                break;
        }
        if (error != "") {
            UIAlert.Show(error, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
        }
    }
    UpdateRoomInfo(roomInfo) {
    }
    OnPlayerJoin(player) {
    }
    OnPlayerLeave(player) {
    }
    HandleFullPlayer(completeHandler) {
        completeHandler();
    }
}
