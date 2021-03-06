define(["require", "exports", "../../RC/Utils/Hashtable", "../CDefs", "./VEntity"], function (require, exports, Hashtable_1, CDefs_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VSceneItem extends VEntity_1.VEntity {
        LoadCDef() {
            return CDefs_1.CDefs.GetSceneItem(this._id);
        }
        AfterLoadCDef(cdefs) {
            this.DisplayRoot();
            this.animationProxy.Play(Hashtable_1.Hashtable.GetNumber(cdefs, "animation"), 0, 1, false);
        }
    }
    exports.VSceneItem = VSceneItem;
});
//# sourceMappingURL=VSceneItem.js.map