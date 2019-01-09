define(["require", "exports", "../CDefs", "./VEntity", "../../RC/Utils/Hashtable"], function (require, exports, CDefs_1, VEntity_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FxFollowType;
    (function (FxFollowType) {
        FxFollowType[FxFollowType["None"] = 0] = "None";
        FxFollowType[FxFollowType["Bullet"] = 1] = "Bullet";
        FxFollowType[FxFollowType["Target"] = 2] = "Target";
    })(FxFollowType = exports.FxFollowType || (exports.FxFollowType = {}));
    var FxDestroyType;
    (function (FxDestroyType) {
        FxDestroyType[FxDestroyType["Effect"] = 0] = "Effect";
        FxDestroyType[FxDestroyType["Bullet"] = 1] = "Bullet";
        FxDestroyType[FxDestroyType["Target"] = 2] = "Target";
    })(FxDestroyType = exports.FxDestroyType || (exports.FxDestroyType = {}));
    class VBullet extends VEntity_1.VEntity {
        LoadDefs() {
            const cdefs = CDefs_1.CDefs.GetBullet(this._id);
            this._hitFxID = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_effect");
            this._hitFxDelay = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_fx_delay");
            this._hitFxFollowType = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_fx_follow_type");
            this._hitFxDestroyType = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_fx_destroy_type");
        }
        OnHit(target) {
            this._target = target;
        }
    }
    exports.VBullet = VBullet;
});
//# sourceMappingURL=VBullet.js.map