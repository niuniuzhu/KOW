"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Global_1 = require("../Global");
const protos_1 = require("../Libs/protos");
const UIAlert_1 = require("./UIAlert");
class UIMatching {
    constructor() {
        this._images = [];
        this._nicknames = [];
        fairygui.UIPackage.addPackage("res/ui/matching");
        this._root = fairygui.UIPackage.createObject("matching", "Main").asCom;
        this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
        this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._images.push(this._root.getChild("image0").asCom);
        this._images.push(this._root.getChild("image1").asCom);
        this._nicknames.push(this._root.getChild("nickname0").asTextField);
        this._nicknames.push(this._root.getChild("nickname1").asTextField);
    }
    get root() { return this._root; }
    Dispose() {
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
    OnEnterBattleResult(result, onConfirm) {
        switch (result) {
            case protos_1.Protos.CS2GC_EnterBattle.Result.Success:
                break;
            case protos_1.Protos.CS2GC_EnterBattle.Result.BSLost:
            case protos_1.Protos.CS2GC_EnterBattle.Result.BSNotFound:
            case protos_1.Protos.CS2GC_EnterBattle.Result.BattleCreateFailed:
                UIAlert_1.UIAlert.Show("登录战场失败", onConfirm);
                break;
        }
    }
    OnFail(message, callback = null) {
        UIAlert_1.UIAlert.Show(message, callback);
    }
    UpdateRoomInfo(roomInfo) {
    }
    OnPlayerJoin(playerInfo, index) {
        this._images[index].getChild("loader").asCom.getChild("icon").asLoader.url = playerInfo.avatar;
        this._nicknames[index].text = playerInfo.nickname;
    }
    OnPlayerLeave(index) {
        this._images[index].getChild("loader").asCom.getChild("icon").asLoader.url = "";
        this._nicknames[index].text = "";
    }
}
exports.UIMatching = UIMatching;
