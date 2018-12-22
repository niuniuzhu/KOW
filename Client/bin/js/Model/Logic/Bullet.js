define(["require", "exports", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/Utils/Hashtable", "../Defs", "./Entity", "../../Libs/long"], function (require, exports, FMathUtils_1, FVec2_1, Hashtable_1, Defs_1, Entity_1, Long) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BulletMoveType;
    (function (BulletMoveType) {
        BulletMoveType[BulletMoveType["Linear"] = 0] = "Linear";
        BulletMoveType[BulletMoveType["Ring"] = 1] = "Ring";
        BulletMoveType[BulletMoveType["Follow"] = 2] = "Follow";
    })(BulletMoveType || (BulletMoveType = {}));
    var BulletShape;
    (function (BulletShape) {
        BulletShape[BulletShape["Circle"] = 0] = "Circle";
        BulletShape[BulletShape["Rect"] = 1] = "Rect";
    })(BulletShape || (BulletShape = {}));
    var DestroyType;
    (function (DestroyType) {
        DestroyType[DestroyType["Life"] = 0] = "Life";
        DestroyType[DestroyType["Collsion"] = 1] = "Collsion";
        DestroyType[DestroyType["Caster"] = 2] = "Caster";
        DestroyType[DestroyType["Emitter"] = 3] = "Emitter";
    })(DestroyType || (DestroyType = {}));
    class Bullet extends Entity_1.Entity {
        constructor() {
            super(...arguments);
            this._casterID = Long.ZERO;
            this._skillID = 0;
            this._time = 0;
        }
        Init(params) {
            super.Init(params);
            this._casterID = params.casterID;
            this._skillID = params.skillID;
            this.position.CopyFrom(params.position);
            this.direction.CopyFrom(params.direction);
        }
        OnInit() {
            this._def = Defs_1.Defs.GetBullet(this._id);
            this._moveType = Hashtable_1.Hashtable.GetNumber(this._def, "move_type");
            this._speed = Hashtable_1.Hashtable.GetNumber(this._def, "speed");
            this._angleSpeed = Hashtable_1.Hashtable.GetNumber(this._def, "angle_speed");
            this._angleRadius = Hashtable_1.Hashtable.GetNumber(this._def, "angle_radius");
            this._lifeTime = Hashtable_1.Hashtable.GetNumber(this._def, "life_time", -1);
            this._destroyType = Hashtable_1.Hashtable.GetNumber(this._def, "destroy_type");
            this._collisionStartTime = Hashtable_1.Hashtable.GetNumber(this._def, "collision_start_time");
            this._maxCollisionCount = Hashtable_1.Hashtable.GetNumber(this._def, "max_collision_count", -1);
            this._shape = Hashtable_1.Hashtable.GetNumber(this._def, "shape");
            this._shapeRadius = Hashtable_1.Hashtable.GetNumber(this._def, "shape_radius");
            this._shapeWidth = Hashtable_1.Hashtable.GetNumber(this._def, "shape_width");
            this._shapeHeight = Hashtable_1.Hashtable.GetNumber(this._def, "shape_height");
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
            writer.uint64(this._casterID);
            writer.int32(this._skillID);
            writer.int32(this._time);
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
            this._casterID = reader.uint64();
            this._skillID = reader.int32();
            this._time = reader.int32();
        }
        Update(dt) {
            super.Update(dt);
            this.MoveStep(dt);
            this._time += dt;
            switch (this._destroyType) {
                case DestroyType.Life:
                    if (this._time >= this._lifeTime) {
                        this._markToDestroy = true;
                    }
                    break;
                case DestroyType.Caster:
                    break;
                case DestroyType.Emitter:
                    break;
                case DestroyType.Collsion:
                    break;
            }
        }
        MoveStep(dt) {
            if (this._speed == 0) {
                return;
            }
            switch (this._moveType) {
                case BulletMoveType.Linear:
                    {
                        const moveDelta = FVec2_1.FVec2.MulN(FVec2_1.FVec2.MulN(this.direction, this._speed), FMathUtils_1.FMathUtils.Mul(0.001, dt));
                        const pos = FVec2_1.FVec2.Add(this.position, moveDelta);
                        this.position.CopyFrom(pos);
                    }
                    break;
                case BulletMoveType.Ring:
                    break;
                case BulletMoveType.Follow:
                    break;
            }
        }
    }
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map