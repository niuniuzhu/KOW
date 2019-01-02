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
import { Logger } from "../../RC/Utils/Logger";

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
	Caster,
	Emitter
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
	private _collisionStartTime: number;
	private _maxCollisionCount: number;
	private _targetType: TargetType;
	private _attrTypes: AttrFilter[];
	private _attrFilterOPs: AttrFilterOP[];
	private _attrCompareValues: number[];

	//runtie properties
	private readonly _targets0: Champion[] = [];
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

	public Init(params: EntityInitParams): void {
		super.Init(params);
		this._casterID = params.casterID;
		this._skillID = params.skillID;
		this.position.CopyFrom(params.position);
		this.direction.CopyFrom(params.direction);
	}

	protected LoadDefs(): void {
		this._defs = Defs.GetBullet(this._id);
	}

	protected OnInit(): void {
		super.OnInit();
		this._radius = Hashtable.GetNumber(this._defs, "radius");
		this._moveSpeed = Hashtable.GetNumber(this._defs, "move_speed");
		this._moveType = Hashtable.GetNumber(this._defs, "move_type");
		this._angleSpeed = Hashtable.GetNumber(this._defs, "angle_speed");
		this._angleRadius = Hashtable.GetNumber(this._defs, "angle_radius");
		this._lifeTime = Hashtable.GetNumber(this._defs, "life_time", -1);
		this._destroyType = Hashtable.GetNumber(this._defs, "destroy_type");
		this._collisionStartTime = Hashtable.GetNumber(this._defs, "collision_start_time");
		this._maxCollisionCount = Hashtable.GetNumber(this._defs, "max_collision_count", -1);
		this._targetType = Hashtable.GetNumber(this._defs, "target_type");
		this._attrTypes = Hashtable.GetNumberArray(this._defs, "attr_types");
		this._attrFilterOPs = Hashtable.GetNumberArray(this._defs, "attr_filter_ops");
		this._attrCompareValues = Hashtable.GetNumberArray(this._defs, "attr_compare_values");
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
		writer.uint64(this._casterID);
		writer.int32(this._skillID);
		writer.int32(this._time);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
		this._casterID = <Long>reader.uint64();
		this._skillID = reader.int32();
		this._time = reader.int32();
	}

	public Update(dt: number): void {
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
				//todo
				break;

			case DestroyType.Emitter:
				//todo
				break;

			case DestroyType.Collsion:
				//todo
				break;
		}
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
		this.SelectTargets();
		for (const target of this._targets1) {
			const intersectType = Intersection.IntersectsCC(this.position, this._radius, target.position, target.radius);
			if (intersectType == IntersectionType.Cling || intersectType == IntersectionType.Inside) {
				//添加受击单元
				this._battle.hitManager.AddHitUnit(this._casterID, target.rid, this._skillID);
			}
		}
		this._targets1.splice(0);
		this._targets2.splice(0);
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