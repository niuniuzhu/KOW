define(["require", "exports", "../CDefs", "../Defs", "./VEntity"], function (require, exports, CDefs_1, Defs_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VBullet extends VEntity_1.VEntity {
        LoadDefs() {
            this._defs = Defs_1.Defs.GetBullet(this._id);
            this._cdefs = CDefs_1.CDefs.GetBullet(this._id);
        }
    }
    exports.VBullet = VBullet;
});
//# sourceMappingURL=VBullet.js.map