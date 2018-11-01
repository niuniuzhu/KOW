define(["require", "exports", "../../Graphic", "../../Scene/PreloadInstance", "../../Consts"], function (require, exports, Graphic_1, PreloadInstance_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBattle {
        Init(loginRet) {
            Graphic_1.Graphic.battleRoot.addChild(PreloadInstance_1.PreloadInstance.instances.get(Consts_1.Consts.ASSETS_MAP_PREFIX + loginRet.mapID));
        }
        Clear() {
        }
        Update(dt) {
        }
    }
    exports.VBattle = VBattle;
});
//# sourceMappingURL=VBattle.js.map