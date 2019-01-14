define(["require", "exports", "../../RC/Utils/Hashtable", "../CDefs", "./VEntity"], function (require, exports, Hashtable_1, CDefs_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VSceneItem extends VEntity_1.VEntity {
        BeforeLoadDefs() {
            return CDefs_1.CDefs.GetSceneItem(this._id);
        }
        AfterLoadDefs(cdefs) {
            this.DisplayRoot();
            this._animationProxy.Play(Hashtable_1.Hashtable.GetNumber(cdefs, "animation"), 0, 1, false);
        }
        DecodeSync(rid, reader, isNew) {
            super.DecodeSync(rid, reader, isNew);
        }
    }
    exports.VSceneItem = VSceneItem;
});
//# sourceMappingURL=VSceneItem.js.map