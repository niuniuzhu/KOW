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
    var TargetType;
    (function (TargetType) {
        TargetType[TargetType["Opponent"] = 0] = "Opponent";
        TargetType[TargetType["Teamate"] = 1] = "Teamate";
        TargetType[TargetType["Self"] = 2] = "Self";
    })(TargetType || (TargetType = {}));
    var AttrFilter;
    (function (AttrFilter) {
        AttrFilter[AttrFilter["Distence"] = 0] = "Distence";
        AttrFilter[AttrFilter["Hp"] = 1] = "Hp";
        AttrFilter[AttrFilter["Mp"] = 2] = "Mp";
        AttrFilter[AttrFilter["Atk"] = 3] = "Atk";
        AttrFilter[AttrFilter["Def"] = 4] = "Def";
        AttrFilter[AttrFilter["Speed"] = 5] = "Speed";
    })(AttrFilter || (AttrFilter = {}));
    var AttrFilterOP;
    (function (AttrFilterOP) {
        AttrFilterOP[AttrFilterOP["Max"] = 0] = "Max";
        AttrFilterOP[AttrFilterOP["Min"] = 1] = "Min";
        AttrFilterOP[AttrFilterOP["Equal"] = 2] = "Equal";
        AttrFilterOP[AttrFilterOP["Greater"] = 3] = "Greater";
        AttrFilterOP[AttrFilterOP["GreaterEqual"] = 4] = "GreaterEqual";
        AttrFilterOP[AttrFilterOP["Less"] = 5] = "Less";
        AttrFilterOP[AttrFilterOP["LessEqual"] = 6] = "LessEqual";
    })(AttrFilterOP || (AttrFilterOP = {}));
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
            this._targets0 = [];
            this._targets1 = [];
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
            this._targetType = Hashtable_1.Hashtable.GetNumber(this._def, "target_type");
            this._attrTypes = Hashtable_1.Hashtable.GetNumberArray(this._def, "attr_types");
            this._attrFilterOPs = Hashtable_1.Hashtable.GetNumberArray(this._def, "attr_filter_ops");
            this._attrCompareValues = Hashtable_1.Hashtable.GetNumberArray(this._def, "attr_compare_values");
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
        SelectTargets() {
            const champions = this._battle.GetChampions();
            const caster = this._battle.GetChampion(this._casterID);
            switch (this._targetType) {
                case TargetType.Opponent:
                    for (const champion of champions) {
                        if (champion.team != caster.team)
                            this._targets0.push(champion);
                    }
                    break;
                case TargetType.Teamate:
                    for (const champion of champions) {
                        if (champion.team == caster.team)
                            this._targets0.push(champion);
                    }
                    break;
                case TargetType.Self:
                    this._targets0.push(caster);
                    break;
            }
            if (this._targets0.length == 0)
                return;
            const count = this._attrTypes.length;
            for (let i = 0; i < count; ++i) {
                const attrType = this._attrTypes[i];
                const attrOp = this._attrFilterOPs[i];
                const compareValue = this._attrCompareValues[i];
                switch (attrType) {
                    case AttrFilter.Distence:
                        this.FilterDistance(caster, attrType, attrOp, compareValue);
                        break;
                    case AttrFilter.Hp:
                        break;
                    case AttrFilter.Mp:
                        break;
                    case AttrFilter.Atk:
                        break;
                    case AttrFilter.Def:
                        break;
                    case AttrFilter.Speed:
                        break;
                }
            }
        }
        FilterDistance(caster, attrType, attrOp, compareValue) {
            switch (attrOp) {
                case AttrFilterOP.Max: {
                    if (this._targets0.length == 1) {
                        this._targets1.push(this._targets0[0]);
                    }
                    else {
                        let maxValue = 0;
                        let meet;
                        for (const target of this._targets0) {
                            const distanceSqr = caster.position.DistanceSquared(target.position);
                            if (distanceSqr > maxValue) {
                                maxValue = distanceSqr;
                                meet = target;
                            }
                        }
                        this._targets1.push(meet);
                    }
                    break;
                }
                case AttrFilterOP.Min:
                    if (this._targets0.length == 1) {
                        this._targets1.push(this._targets0[0]);
                    }
                    else {
                        let minValue = FMathUtils_1.FMathUtils.MAX_VALUE;
                        let meet;
                        for (const target of this._targets0) {
                            const distanceSqr = caster.position.DistanceSquared(target.position);
                            if (distanceSqr < minValue) {
                                minValue = distanceSqr;
                                meet = target;
                            }
                        }
                        this._targets1.push(meet);
                    }
                    break;
                case AttrFilterOP.Equal: {
                    let meet;
                    for (const target of this._targets0) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr == FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets1.push(meet);
                    break;
                }
                case AttrFilterOP.Greater: {
                    let meet;
                    for (const target of this._targets0) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr < FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets1.push(meet);
                    break;
                }
                case AttrFilterOP.GreaterEqual: {
                    let meet;
                    for (const target of this._targets0) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr <= FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets1.push(meet);
                    break;
                }
                case AttrFilterOP.Less: {
                    let meet;
                    for (const target of this._targets0) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr > FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets1.push(meet);
                    break;
                }
                case AttrFilterOP.LessEqual: {
                    let meet;
                    for (const target of this._targets0) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr >= FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets1.push(meet);
                    break;
                }
            }
        }
    }
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map