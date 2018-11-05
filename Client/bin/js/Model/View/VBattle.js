define(["require", "exports", "../../Consts", "../../Global"], function (require, exports, Consts_1, Global_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        Init(battleInfo) {
            this._root = fairygui.UIPackage.createObject("assets", Consts_1.Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
            Global_1.Global.graphic.battleRoot.addChild(this._root);
        }
        Clear() {
        }
        Update(dt) {
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map