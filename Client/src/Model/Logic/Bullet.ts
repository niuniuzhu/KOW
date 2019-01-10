import * as Long from "../../Libs/long";
import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Intersection, IntersectionType } from "../../RC/FMath/Intersection";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { Champion } from "./Champion";
import { Entity, EntityInitParams } from "./Entity";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { Logger } from "../../RC/Utils/Logger";
import { EAttr } from "./Attribute";

enum BulletMoveType {
	Linear,
	Ring,
	Follow,
}

enum TargetType {
	Opponent,
	Teamate,
	Self
}

enum AttrFilter {
	Distence,
	Hp,
	Mp,
	Atk,
	Def,
	Velocity
}

enum AttrFilterOP {
	Max,
	Min,
	Equal,
	Greater,
	GreaterEqual,
	Less,
	LessEqual
}

enum DestroyType {
	Life,
	Collsion,
	Emitter,
	Caster
}

export class Bullet extends Entity implements ISnapshotable {
	//static properties
	private _radius: number;
	private _moveSpeed: number;
	private _moveType: BulletMoveType;
	private _angleSpeed: number;
	private _angleRadius: number;
	private _lifeTime: number;
	private _destroyType: DestroyType;
	private _delay: number;
	private _frequency: number;
	private _maxCollisionPerTarget: number;
	private _maxCollision: number;
	private _targetType: TargetType;
	private _whipping: boolean;
	private _attrTypes: AttrFilter[];
	private _attrFilterOPs: AttrFilterOP[];
	private _attrCompareValues: number[];

	//runtie properties
	private readonly _targets1: Champion[] = [];
	private readonly _targets2: Champion[] = [];

	/**
	 * 产生者ID
	 */
	private _casterID: Long = Long.ZERO;
	/**
	 * 技能ID
	 */
	private _skillID: number = 0;
	/**
	 * 子弹运行时间
	 */
	private _time: number = 0;
	/**
	 * 下次碰撞检测的时间
	 */
	private _nextCollisionTime: number = 0;
	/**
	 * 记录碰撞次数
	 */
	private _collisionCount: number = 0;
	/**
	 * 记录每个目标的碰撞次数
	 */
	private readonly _targetToCollisionCount = new Map<Long, number>();//todo 无序?

	public Init(params: EntityInitParams): void {
		super.Init(params);
		this._casterID = params.casterID;
		this._skillID = params.skillID;
		this.position.CopyFrom(params.position);
		this.direction.CopyFrom(params.direction);
	}

	protected LoadDefs(): void {
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
		this._nextCollisionTime = this._delay;
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
		writer.uint64(this._casterID);
		writer.int32(this._skillID);
		writer.int32(this._time);
		writer.int32(this._nextCollisionTime);
		Logger.Log("encode:" + this._nextCollisionTime);
		writer.int32(this._collisionCount);
		const count = this._targetToCollisionCount.size;
		writer.int32(count);
		for (const rid in this._targetToCollisionCount) {
			writer.uint64(rid);
			writer.int32(this._targetToCollisionCount[rid]);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
		this._casterID = <Long>reader.uint64();
		this._skillID = reader.int32();
		this._time = reader.int32();
		this._nextCollisionTime = reader.int32();
		Logger.Log("decode:" + this._nextCollisionTime);
		this._collisionCount = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			this._targetToCollisionCount.set(<Long>reader.uint64(), reader.int32());
		}
	}

	public Update(dt: number): void {
		switch (this._destroyType) {
			case DestroyType.Life:
				if (this._time >= this._lifeTime) {
					this._markToDestroy = true;
					return;
				}
				break;

			case DestroyType.Caster:
				//todo
				break;

			case DestroyType.Emitter:
				//todo
				break;

			case DestroyType.Collsion:
				//todo
				break;
		}
		super.Update(dt);
		this.MoveStep(dt);
		this._time += dt;
	}

	private MoveStep(dt: number): void {
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
				//todo
				break;

			case BulletMoveType.Follow:
				//todo
				break;
		}
	}

	/**
	 * 相交性检测
	 */
	public Intersect(): void {
		//检测碰撞频率
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
				//获取目标的碰撞次数
				let count = 0;
				if (this._targetToCollisionCount.has(target.rid))
					count = this._targetToCollisionCount.get(target.rid);
				//超过单个目标手机次数
				if (this._maxCollisionPerTarget >= 0 &&
					count == this._maxCollisionPerTarget)
					continue;
				//派发子弹碰撞通知
				if (!target.battle.chase) {
					SyncEvent.BulletCollision(this.rid, this._casterID, target.rid);
				}
				//添加受击单元
				this._battle.hitManager.AddHitUnit(this._casterID, target.rid, this._skillID);
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

	private SelectTargets(): void {
		const champions = this._battle.GetChampions();
		const caster = this._battle.GetChampion(this._casterID);

		//选择目标
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
		//没有找到目标
		if (this._targets1.length == 0) {
			return;
		}
		//没有属性过滤则直接添加
		if (this._attrTypes == null || this._attrTypes.length == 0) {
			this._targets2.concat(this._targets1);
		}
		//过滤属性
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
						return t.GetAttr(EAttr.HP);
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

	private FilterDistance(caster: Champion, attrOp: AttrFilterOP, compareValue: number): void {
		switch (attrOp) {
			case AttrFilterOP.Max: {
				if (this._targets1.length == 1) {
					this._targets2.push(this._targets1[0]);
				}
				else {
					let maxValue = 0;
					let meet: Champion;
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
					let minValue = FMathUtils.MAX_VALUE;
					let meet: Champion;
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
				let meet: Champion;
				for (const target of this._targets1) {
					const distanceSqr = caster.position.DistanceSquared(target.position);
					if (distanceSqr == FMathUtils.Mul(compareValue, compareValue)) {
						meet = target;
					}
				}
				if (meet != null)
					this._targets2.push(meet);
				break;
			}

			case AttrFilterOP.Greater: {
				let meet: Champion;
				for (const target of this._targets1) {
					const distanceSqr = caster.position.DistanceSquared(target.position);
					if (distanceSqr < FMathUtils.Mul(compareValue, compareValue)) {
						meet = target;
					}
				}
				if (meet != null)
					this._targets2.push(meet);
				break;
			}

			case AttrFilterOP.GreaterEqual: {
				let meet: Champion;
				for (const target of this._targets1) {
					const distanceSqr = caster.position.DistanceSquared(target.position);
					if (distanceSqr <= FMathUtils.Mul(compareValue, compareValue)) {
						meet = target;
					}
				}
				if (meet != null)
					this._targets2.push(meet);
				break;
			}

			case AttrFilterOP.Less: {
				let meet: Champion;
				for (const target of this._targets1) {
					const distanceSqr = caster.position.DistanceSquared(target.position);
					if (distanceSqr > FMathUtils.Mul(compareValue, compareValue)) {
						meet = target;
					}
				}
				if (meet != null)
					this._targets2.push(meet);
				break;
			}

			case AttrFilterOP.LessEqual: {
				let meet: Champion;
				for (const target of this._targets1) {
					const distanceSqr = caster.position.DistanceSquared(target.position);
					if (distanceSqr >= FMathUtils.Mul(compareValue, compareValue)) {
						meet = target;
					}
				}
				if (meet != null)
					this._targets2.push(meet);
				break;
			}
		}
	}

	private FilterAttr(caster: Champion, attrOp: AttrFilterOP, compareValue: number,
		getFunc: (c: Champion, t: Champion) => number, compValFunc: (v: number) => number, targetValFunc: (v: number) => number): void {
		switch (attrOp) {
			case AttrFilterOP.Max: {
				if (this._targets1.length == 1) {
					this._targets2.push(this._targets1[0]);
				}
				else {
					let maxValue = 0;
					let meet: Champion;
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
					let minValue = FMathUtils.MAX_VALUE;
					let meet: Champion;
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
				let meet: Champion;
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
				let meet: Champion;
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
				let meet: Champion;
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
				let meet: Champion;
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
				let meet: Champion;
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