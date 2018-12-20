define(["require", "exports", "../Defs", "./Entity"], function (require, exports, Defs_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BulletMoveType;
    (function (BulletMoveType) {
        BulletMoveType[BulletMoveType["Linear"] = 0] = "Linear";
        BulletMoveType[BulletMoveType["Ring"] = 1] = "Ring";
        BulletMoveType[BulletMoveType["Follow"] = 2] = "Follow";
    })(BulletMoveType = exports.BulletMoveType || (exports.BulletMoveType = {}));
    var BulletShape;
    (function (BulletShape) {
        BulletShape[BulletShape["Circle"] = 0] = "Circle";
        BulletShape[BulletShape["Rect"] = 1] = "Rect";
    })(BulletShape = exports.BulletShape || (exports.BulletShape = {}));
    class Bullet extends Entity_1.Entity {
        OnInit() {
            this._def = Defs_1.Defs.GetBullet(this._id);
        }
        EncodeSnapshot(writer) {
        }
        DecodeSnapshot(reader) {
        }
    }
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map