"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hashtable_1 = require("../../RC/Utils/Hashtable");
const CDefs_1 = require("../CDefs");
const VEntity_1 = require("./VEntity");
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
