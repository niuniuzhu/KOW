define(["require", "exports", "../../RC/Utils/Hashtable", "../CDefs", "./AnimationProxy", "./VEntity"], function (require, exports, Hashtable_1, CDefs_1, AnimationProxy_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VSceneItem extends VEntity_1.VEntity {
        LoadDefs() {
            const cdefs = CDefs_1.CDefs.GetSceneItem(this._id);
            const modelID = Hashtable_1.Hashtable.GetNumber(cdefs, "model", -1);
            if (modelID >= 0) {
                this._animationProxy = new AnimationProxy_1.AnimationProxy(modelID);
                this._root.addChild(this._animationProxy);
            }
            this._animationProxy.Play(Hashtable_1.Hashtable.GetNumber(cdefs, "animation"), 0, 1, false);
        }
        DecodeSync(rid, reader, isNew) {
            super.DecodeSync(rid, reader, isNew);
        }
    }
    exports.VSceneItem = VSceneItem;
});
//# sourceMappingURL=VSceneItem.js.map