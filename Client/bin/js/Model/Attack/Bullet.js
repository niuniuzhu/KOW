define(["require", "exports"], function (require, exports) {
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
    class Bullet {
        EncodeSnapshot(writer) {
        }
        DecodeSnapshot(reader) {
        }
    }
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map