define(["require", "exports", "./VEntityStateAction", "../../../RC/Utils/Logger"], function (require, exports, VEntityStateAction_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VActShake extends VEntityStateAction_1.VEntityStateAction {
        OnInit(def) {
            Logger_1.Logger.Log("ddd");
        }
        OnEnter(param) {
            super.OnEnter(param);
            Logger_1.Logger.Log("enter");
        }
    }
    exports.VActShake = VActShake;
});
//# sourceMappingURL=VActShake.js.map