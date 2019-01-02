define(["require", "exports", "../../Libs/long", "../../RC/FMath/FMathUtils", "../../RC/FMath/FVec2", "../../RC/FMath/Intersection", "../../RC/Utils/Hashtable", "../Defs", "./Entity"], function (require, exports, Long, FMathUtils_1, FVec2_1, Intersection_1, Hashtable_1, Defs_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BulletMoveType;
    (function (BulletMoveType) {
        BulletMoveType[BulletMoveType["Linear"] = 0] = "Linear";
        BulletMoveType[BulletMoveType["Ring"] = 1] = "Ring";
        BulletMoveType[BulletMoveType["Follow"] = 2] = "Follow";
    })(BulletMoveType || (BulletMoveType = {}));
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
        AttrFilter[AttrFilter["Velocity"] = 5] = "Velocity";
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
            this._targets2 = [];
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
        LoadDefs() {
            this._defs = Defs_1.Defs.GetBullet(this._id);
        }
        OnInit() {
            super.OnInit();
            this._radius = Hashtable_1.Hashtable.GetNumber(this._defs, "radius");
            this._moveSpeed = Hashtable_1.Hashtable.GetNumber(this._defs, "move_speed");
            this._moveType = Hashtable_1.Hashtable.GetNumber(this._defs, "move_type");
            this._angleSpeed = Hashtable_1.Hashtable.GetNumber(this._defs, "angle_speed");
            this._angleRadius = Hashtable_1.Hashtable.GetNumber(this._defs, "angle_radius");
            this._lifeTime = Hashtable_1.Hashtable.GetNumber(this._defs, "life_time", -1);
            this._destroyType = Hashtable_1.Hashtable.GetNumber(this._defs, "destroy_type");
            this._collisionStartTime = Hashtable_1.Hashtable.GetNumber(this._defs, "collision_start_time");
            this._maxCollisionCount = Hashtable_1.Hashtable.GetNumber(this._defs, "max_collision_count", -1);
            this._targetType = Hashtable_1.Hashtable.GetNumber(this._defs, "target_type");
            this._attrTypes = Hashtable_1.Hashtable.GetNumberArray(this._defs, "attr_types");
            this._attrFilterOPs = Hashtable_1.Hashtable.GetNumberArray(this._defs, "attr_filter_ops");
            this._attrCompareValues = Hashtable_1.Hashtable.GetNumberArray(this._defs, "attr_compare_values");
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
            if (this._moveSpeed == 0) {
                return;
            }
            switch (this._moveType) {
                case BulletMoveType.Linear:
                    {
                        const moveDelta = FVec2_1.FVec2.MulN(FVec2_1.FVec2.MulN(this.direction, this._moveSpeed), FMathUtils_1.FMathUtils.Mul(0.001, dt));
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
        Intersect() {
            this.SelectTargets();
            for (const target of this._targets1) {
                const intersectType = Intersection_1.Intersection.IntersectsCC(this.position, this._radius, target.position, target.radius);
                if (intersectType == Intersection_1.IntersectionType.Cling || intersectType == Intersection_1.IntersectionType.Inside) {
                    this._battle.hitManager.AddHitUnit(this._casterID, target.rid, this._skillID);
                }
            }
            this._targets1.splice(0);
            this._targets2.splice(0);
        }
        SelectTargets() {
            const champions = this._battle.GetChampions();
            const caster = this._battle.GetChampion(this._casterID);
            switch (this._targetType) {
                case TargetType.Opponent:
                    for (const champion of champions) {
                        if (champion.team != caster.team)
                            this._targets1.push(champion);
                    }
                    break;
                case TargetType.Teamate:
                    for (const champion of champions) {
                        if (champion.team == caster.team)
                            this._targets1.push(champion);
                    }
                    break;
                case TargetType.Self:
                    this._targets1.push(caster);
                    break;
            }
            if (this._targets1.length == 0) {
                return;
            }
            if (this._attrTypes == null || this._attrTypes.length == 0) {
                this._targets2.concat(this._targets1);
            }
            const count = this._attrTypes.length;
            for (let i = 0; i < count; ++i) {
                const attrType = this._attrTypes[i];
                const attrOp = this._attrFilterOPs[i];
                const compareValue = this._attrCompareValues[i];
                switch (attrType) {
                    case AttrFilter.Distence:
                        this.FilterDistance(caster, attrOp, compareValue);
                        break;
                    case AttrFilter.Hp:
                        this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                            return t.hp;
                        }, v => v, v => v);
                        break;
                    case AttrFilter.Mp:
                        this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                            return t.mp;
                        }, v => v, v => v);
                        break;
                    case AttrFilter.Atk:
                        this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                            return t.atk;
                        }, v => v, v => v);
                        break;
                    case AttrFilter.Def:
                        this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                            return t.def;
                        }, v => v, v => v);
                        break;
                    case AttrFilter.Velocity:
                        this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                            return t.velocity;
                        }, v => v, v => v);
                        break;
                }
            }
        }
        FilterDistance(caster, attrOp, compareValue) {
            switch (attrOp) {
                case AttrFilterOP.Max: {
                    if (this._targets1.length == 1) {
                        this._targets2.push(this._targets1[0]);
                    }
                    else {
                        let maxValue = 0;
                        let meet;
                        for (const target of this._targets1) {
                            const distanceSqr = caster.position.DistanceSquared(target.position);
                            if (distanceSqr > maxValue) {
                                maxValue = distanceSqr;
                                meet = target;
                            }
                        }
                        this._targets2.push(meet);
                    }
                    break;
                }
                case AttrFilterOP.Min:
                    if (this._targets1.length == 1) {
                        this._targets2.push(this._targets1[0]);
                    }
                    else {
                        let minValue = FMathUtils_1.FMathUtils.MAX_VALUE;
                        let meet;
                        for (const target of this._targets1) {
                            const distanceSqr = caster.position.DistanceSquared(target.position);
                            if (distanceSqr < minValue) {
                                minValue = distanceSqr;
                                meet = target;
                            }
                        }
                        this._targets2.push(meet);
                    }
                    break;
                case AttrFilterOP.Equal: {
                    let meet;
                    for (const target of this._targets1) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr == FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.Greater: {
                    let meet;
                    for (const target of this._targets1) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr < FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.GreaterEqual: {
                    let meet;
                    for (const target of this._targets1) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr <= FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.Less: {
                    let meet;
                    for (const target of this._targets1) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr > FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.LessEqual: {
                    let meet;
                    for (const target of this._targets1) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr >= FMathUtils_1.FMathUtils.Mul(compareValue, compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
            }
        }
        FilterAttr(caster, attrOp, compareValue, getFunc, compValFunc, targetValFunc) {
            switch (attrOp) {
                case AttrFilterOP.Max: {
                    if (this._targets1.length == 1) {
                        this._targets2.push(this._targets1[0]);
                    }
                    else {
                        let maxValue = 0;
                        let meet;
                        for (const target of this._targets1) {
                            const attrValue = getFunc(caster, target);
                            if (targetValFunc(attrValue) > compValFunc(maxValue)) {
                                maxValue = attrValue;
                                meet = target;
                            }
                        }
                        this._targets2.push(meet);
                    }
                    break;
                }
                case AttrFilterOP.Min: {
                    if (this._targets1.length == 1) {
                        this._targets2.push(this._targets1[0]);
                    }
                    else {
                        let minValue = FMathUtils_1.FMathUtils.MAX_VALUE;
                        let meet;
                        for (const target of this._targets1) {
                            const attrValue = getFunc(caster, target);
                            if (targetValFunc(attrValue) < compValFunc(minValue)) {
                                minValue = attrValue;
                                meet = target;
                            }
                        }
                        this._targets2.push(meet);
                    }
                    break;
                }
                case AttrFilterOP.Equal: {
                    let meet;
                    for (const target of this._targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) == compValFunc(compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.Greater: {
                    let meet;
                    for (const target of this._targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) > compValFunc(compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.GreaterEqual: {
                    let meet;
                    for (const target of this._targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) >= compValFunc(compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.Less: {
                    let meet;
                    for (const target of this._targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) < compValFunc(compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
                case AttrFilterOP.LessEqual: {
                    let meet;
                    for (const target of this._targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) <= compValFunc(compareValue)) {
                            meet = target;
                        }
                    }
                    if (meet != null)
                        this._targets2.push(meet);
                    break;
                }
            }
        }
    }
    exports.Bullet = Bullet;
});
//# sourceMappingURL=Bullet.js.map