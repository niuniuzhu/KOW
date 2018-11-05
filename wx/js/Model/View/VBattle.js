import { Consts } from "../../Consts";
import { Global } from "../../Global";
export class VBattle {
    Init(battleInfo) {
        this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
        Global.graphic.battleRoot.addChild(this._root);
    }
    Clear() {
    }
    Update(dt) {
    }
}
