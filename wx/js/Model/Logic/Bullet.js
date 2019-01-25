import * as Long from "../../Libs/long";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Intersection, IntersectionType } from "../../RC/FMath/Intersection";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { EAttr } from "./Attribute";
import { Entity } from "./Entity";
import { BULLET_ACTION_CTOR_MAP } from "../Defines";
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
    DestroyType[DestroyType["Emitter"] = 2] = "Emitter";
    DestroyType[DestroyType["Caster"] = 3] = "Caster";
})(DestroyType || (DestroyType = {}));
export class Bullet extends Entity {
    constructor() {
        super(...arguments);
        this._targets1 = [];
        this._targets2 = [];
        this._casterID = Long.ZERO;
        this._skillID = 0;
        this._time = 0;
        this._nextCollisionTime = 0;
        this._collisionCount = 0;
        this._targetToCollisionCount = new Map();
        this._actions = [];
    }
    get type() { return EntityType.Bullet; }
    get casterID() { return this._casterID; }
    Init(params) {
        super.Init(params);
        this._casterID = params.casterID;
        this._skillID = params.skillID;
        for (const action of this._actions) {
            action.BulletCreated();
        }
    }
    LoadDef() {
        const defs = Defs.GetBullet(this._id);
        this._radius = Hashtable.GetNumber(defs, "radius");
        this._moveSpeed = Hashtable.GetNumber(defs, "move_speed");
        this._moveType = Hashtable.GetNumber(defs, "move_type");
        this._angleSpeed = Hashtable.GetNumber(defs, "angle_speed");
        this._angleRadius = Hashtable.GetNumber(defs, "angle_radius");
        this._lifeTime = Hashtable.GetNumber(defs, "life_time", -1);
        this._destroyType = Hashtable.GetNumber(defs, "destroy_type");
        this._delay = Hashtable.GetNumber(defs, "delay");
        this._frequency = Hashtable.GetNumber(defs, "frequency");
        this._maxCollisionPerTarget = Hashtable.GetNumber(defs, "max_collision_per_target", -1);
        this._maxCollision = Hashtable.GetNumber(defs, "max_collision", -1);
        this._targetType = Hashtable.GetNumber(defs, "target_type");
        this._whipping = Hashtable.GetBool(defs, "whipping");
        this._attrTypes = Hashtable.GetNumberArray(defs, "attr_types");
        this._attrFilterOPs = Hashtable.GetNumberArray(defs, "attr_filter_ops");
        this._attrCompareValues = Hashtable.GetNumberArray(defs, "attr_compare_values");
        const actionsDef = Hashtable.GetMapArray(defs, "actions");
        if (actionsDef != null) {
            for (const actionDef of actionsDef) {
                const type = Hashtable.GetNumber(actionDef, "id");
                const ctr = BULLET_ACTION_CTOR_MAP.get(type);
                const action = new ctr(this, type);
                action.Init(actionDef);
                this._actions.push(action);
            }
        }
        this._nextCollisionTime = this._delay;
    }
    Destroy() {
        for (const action of this._actions) {
            action.BulletDestroy();
        }
        super.Destroy();
    }
    EncodeSnapshot(writer) {
        super.EncodeSnapshot(writer);
        writer.uint64(this._casterID);
        writer.int32(this._skillID);
        writer.int32(this._time);
        writer.int32(this._nextCollisionTime);
        writer.int32(this._collisionCount);
        const count = this._targetToCollisionCount.size;
        writer.int32(count);
        for (const rid in this._targetToCollisionCount) {
            writer.uint64(rid);
            writer.int32(this._targetToCollisionCount[rid]);
        }
    }
    DecodeSnapshot(reader) {
        super.DecodeSnapshot(reader);
        this._casterID = reader.uint64();
        this._skillID = reader.int32();
        this._time = reader.int32();
        this._nextCollisionTime = reader.int32();
        this._collisionCount = reader.int32();
        const count = reader.int32();
        for (let i = 0; i < count; ++i) {
            this._targetToCollisionCount.set(reader.uint64(), reader.int32());
        }
    }
    Update(dt) {
        switch (this._destroyType) {
            case DestroyType.Life:
                if (this._time >= this._lifeTime) {
                    this._markToDestroy = true;
                    return;
                }
                break;
            case DestroyType.Caster:
                break;
            case DestroyType.Emitter:
                break;
            case DestroyType.Collsion:
                break;
        }
        super.Update(dt);
        this.MoveStep(dt);
        this._time += dt;
    }
    MoveStep(dt) {
        if (this._moveSpeed == 0) {
            return;
        }
        switch (this._moveType) {
            case BulletMoveType.Linear:
                {
                    const moveDelta = FVec2.MulN(FVec2.MulN(this.direction, this._moveSpeed), FMathUtils.Mul(0.001, dt));
                    const pos = FVec2.Add(this.position, moveDelta);
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
        if (this._time < this._nextCollisionTime ||
            (this._maxCollision >= 0 && this._collisionCount == this._maxCollision))
            return;
        let hit = false;
        this.SelectTargets();
        for (const target of this._targets1) {
            if (!this._whipping && target.isDead)
                continue;
            const intersectType = Intersection.IntersectsCC(this.position, this._radius, target.position, target.radius);
            if (intersectType == IntersectionType.Cling || intersectType == IntersectionType.Inside) {
                let count = 0;
                if (this._targetToCollisionCount.has(target.rid))
                    count = this._targetToCollisionCount.get(target.rid);
                if (this._maxCollisionPerTarget >= 0 &&
                    count == this._maxCollisionPerTarget)
                    continue;
                for (const action of this._actions) {
                    action.BulletCollision(target);
                }
                if (!target.battle.chase) {
                    SyncEvent.BulletCollision(this.rid, this._casterID, target.rid);
                }
                this._battle.calcManager.AddHitUnit(this._casterID, target.rid, this._skillID);
                hit = true;
                ++this._collisionCount;
                this._targetToCollisionCount.set(target.rid, ++count);
            }
        }
        this._targets1.splice(0);
        this._targets2.splice(0);
        this._nextCollisionTime = this._time + this._frequency - (this._time - this._nextCollisionTime);
        if (hit && this._destroyType == DestroyType.Collsion) {
            this._markToDestroy = true;
        }
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
            return;
        }
        const count = this._attrTypes.length;
        for (let i = 0; i < count; ++i) {
            const attrType = this._attrTypes[i];
            const attrOp = this._attrFilterOPs[i];
            const compareValue = this._attrCompareValues[i];
            switch (attrType) {
                case AttrFilter.Distence:
                    this.FilterDistance(caster, attrOp, compareValue, this._targets2);
                    break;
                case AttrFilter.Hp:
                    this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                        return t.GetAttr(EAttr.HP);
                    }, v => v, v => v, this._targets1, this._targets2);
                    break;
                case AttrFilter.Mp:
                    this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                        return t.mp;
                    }, v => v, v => v, this._targets1, this._targets2);
                    break;
                case AttrFilter.Atk:
                    this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                        return t.atk;
                    }, v => v, v => v, this._targets1, this._targets2);
                    break;
                case AttrFilter.Def:
                    this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                        return t.def;
                    }, v => v, v => v, this._targets1, this._targets2);
                    break;
                case AttrFilter.Velocity:
                    this.FilterAttr(caster, attrOp, compareValue, (c, t) => {
                        return t.velocity;
                    }, v => v, v => v, this._targets1, this._targets2);
                    break;
            }
        }
    }
    FilterDistance(caster, attrOp, compareValue, targets) {
        switch (attrOp) {
            case AttrFilterOP.Max: {
                if (this._targets1.length == 1) {
                    targets.push(this._targets1[0]);
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
                    targets.push(meet);
                }
                break;
            }
            case AttrFilterOP.Min:
                if (this._targets1.length == 1) {
                    targets.push(this._targets1[0]);
                }
                else {
                    let minValue = FMathUtils.MAX_VALUE;
                    let meet;
                    for (const target of this._targets1) {
                        const distanceSqr = caster.position.DistanceSquared(target.position);
                        if (distanceSqr < minValue) {
                            minValue = distanceSqr;
                            meet = target;
                        }
                    }
                    targets.push(meet);
                }
                break;
            case AttrFilterOP.Equal: {
                let meet;
                for (const target of this._targets1) {
                    const distanceSqr = caster.position.DistanceSquared(target.position);
                    if (distanceSqr == FMathUtils.Mul(compareValue, compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets.push(meet);
                break;
            }
            case AttrFilterOP.Greater: {
                let meet;
                for (const target of this._targets1) {
                    const distanceSqr = caster.position.DistanceSquared(target.position);
                    if (distanceSqr < FMathUtils.Mul(compareValue, compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets.push(meet);
                break;
            }
            case AttrFilterOP.GreaterEqual: {
                let meet;
                for (const target of this._targets1) {
                    const distanceSqr = caster.position.DistanceSquared(target.position);
                    if (distanceSqr <= FMathUtils.Mul(compareValue, compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets.push(meet);
                break;
            }
            case AttrFilterOP.Less: {
                let meet;
                for (const target of this._targets1) {
                    const distanceSqr = caster.position.DistanceSquared(target.position);
                    if (distanceSqr > FMathUtils.Mul(compareValue, compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets.push(meet);
                break;
            }
            case AttrFilterOP.LessEqual: {
                let meet;
                for (const target of this._targets1) {
                    const distanceSqr = caster.position.DistanceSquared(target.position);
                    if (distanceSqr >= FMathUtils.Mul(compareValue, compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets.push(meet);
                break;
            }
        }
    }
    FilterAttr(caster, attrOp, compareValue, getFunc, compValFunc, targetValFunc, targets1, targets2) {
        switch (attrOp) {
            case AttrFilterOP.Max: {
                if (targets1.length == 1) {
                    targets2.push(targets1[0]);
                }
                else {
                    let maxValue = 0;
                    let meet;
                    for (const target of targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) > compValFunc(maxValue)) {
                            maxValue = attrValue;
                            meet = target;
                        }
                    }
                    targets2.push(meet);
                }
                break;
            }
            case AttrFilterOP.Min: {
                if (targets1.length == 1) {
                    targets2.push(targets1[0]);
                }
                else {
                    let minValue = FMathUtils.MAX_VALUE;
                    let meet;
                    for (const target of targets1) {
                        const attrValue = getFunc(caster, target);
                        if (targetValFunc(attrValue) < compValFunc(minValue)) {
                            minValue = attrValue;
                            meet = target;
                        }
                    }
                    targets2.push(meet);
                }
                break;
            }
            case AttrFilterOP.Equal: {
                let meet;
                for (const target of targets1) {
                    const attrValue = getFunc(caster, target);
                    if (targetValFunc(attrValue) == compValFunc(compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets2.push(meet);
                break;
            }
            case AttrFilterOP.Greater: {
                let meet;
                for (const target of targets1) {
                    const attrValue = getFunc(caster, target);
                    if (targetValFunc(attrValue) > compValFunc(compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets2.push(meet);
                break;
            }
            case AttrFilterOP.GreaterEqual: {
                let meet;
                for (const target of targets1) {
                    const attrValue = getFunc(caster, target);
                    if (targetValFunc(attrValue) >= compValFunc(compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets2.push(meet);
                break;
            }
            case AttrFilterOP.Less: {
                let meet;
                for (const target of targets1) {
                    const attrValue = getFunc(caster, target);
                    if (targetValFunc(attrValue) < compValFunc(compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets2.push(meet);
                break;
            }
            case AttrFilterOP.LessEqual: {
                let meet;
                for (const target of targets1) {
                    const attrValue = getFunc(caster, target);
                    if (targetValFunc(attrValue) <= compValFunc(compareValue)) {
                        meet = target;
                    }
                }
                if (meet != null)
                    targets2.push(meet);
                break;
            }
        }
    }
}
