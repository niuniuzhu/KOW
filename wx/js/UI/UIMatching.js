import { Protos } from "../Libs/protos";
import { UIAlert } from "./UIAlert";
import { SceneManager } from "../Scene/SceneManager";
import { Graphic } from "../Graphic";
export class UIMatching {
    get root() { return this._root; }
    constructor() {
        fairygui.UIPackage.addPackage("res/ui/matching");
        this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
        this._root.setSize(Graphic.uiRoot.width, Graphic.uiRoot.height);
        this._root.addRelation(Graphic.uiRoot, fairygui.RelationType.Size);
    }
    Dispose() {
    }
    Enter(param) {
        Graphic.uiRoot.addChild(this._root);
    }
    Exit() {
        Graphic.uiRoot.removeChild(this._root);
    }
    Update(dt) {
    }
    OnResize(e) {
    }
    OnConnectToBSError() {
        UIAlert.Show("无法连接服务器", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
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
            UIAlert.Show(error, () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
        }
    }
    OnEnterBattleResult(result) {
        switch (result) {
            case Protos.CS2GC_EnterBattle.Error.Success:
                break;
            case Protos.CS2GC_EnterBattle.Error.BSLost:
            case Protos.CS2GC_EnterBattle.Error.BSNotFound:
            case Protos.CS2GC_EnterBattle.Error.BattleCreateFailed:
                UIAlert.Show("登录战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
                break;
        }
    }
    OnLoginBSResut(result) {
        switch (result) {
            case Protos.Global.ECommon.Success:
                break;
            default:
                UIAlert.Show("进入战场失败", () => SceneManager.ChangeState(SceneManager.State.Matching, null, true));
                break;
        }
    }
    UpdateRoomInfo(roomInfo) {
    }
    UpdatePlayers(_players) {
    }
}
