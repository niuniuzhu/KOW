define(["require", "exports", "../../Graphic", "../../Consts"], function (require, exports, Graphic_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        Init(battleInfo) {
            this._root = fairygui.UIPackage.createObject("assets", Consts_1.Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
            Graphic_1.Graphic.battleRoot.addChild(this._root);
        }
        Clear() {
        }
        Update(dt) {
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map