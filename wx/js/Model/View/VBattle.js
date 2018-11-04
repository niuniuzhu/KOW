import { Graphic } from "../../Graphic";
import { Consts } from "../../Consts";
export class VBattle {
    Init(battleInfo) {
        this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
        Graphic.battleRoot.addChild(this._root);
    }
    Clear() {
    }
    Update(dt) {
    }
}
