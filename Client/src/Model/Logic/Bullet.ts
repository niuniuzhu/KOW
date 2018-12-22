import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { Entity, EntityInitParams } from "./Entity";
import Long = require("../../Libs/long");

enum BulletMoveType {
	Linear,
	Ring,
	Follow,
}

enum BulletShape {
	Circle,
	Rect
}

enum DestroyType {
	Life,
	Collsion,
	Caster,
	Emitter
}

export class Bullet extends Entity implements ISnapshotable {
	private _moveType: BulletMoveType;
	private _speed: number;
	private _angleSpeed: number;
	private _angleRadius: number;
	private _lifeTime: number;
	private _destroyType: DestroyType;
	private _collisionStartTime: number;
	private _maxCollisionCount: number;
	private _shape: BulletShape;
	private _shapeRadius: number;
	private _shapeWidth: number;
	private _shapeHeight: number;

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

	protected OnInit(): void {
		this._def = Defs.GetBullet(this._id);
		this._moveType = Hashtable.GetNumber(this._def, "move_type");
		this._speed = Hashtable.GetNumber(this._def, "speed");
		this._angleSpeed = Hashtable.GetNumber(this._def, "angle_speed");
		this._angleRadius = Hashtable.GetNumber(this._def, "angle_radius");
		this._lifeTime = Hashtable.GetNumber(this._def, "life_time", -1);
		this._destroyType = Hashtable.GetNumber(this._def, "destroy_type");
		this._collisionStartTime = Hashtable.GetNumber(this._def, "collision_start_time");
		this._maxCollisionCount = Hashtable.GetNumber(this._def, "max_collision_count", -1);
		this._shape = Hashtable.GetNumber(this._def, "shape");
		this._shapeRadius = Hashtable.GetNumber(this._def, "shape_radius");
		this._shapeWidth = Hashtable.GetNumber(this._def, "shape_width");
		this._shapeHeight = Hashtable.GetNumber(this._def, "shape_height");
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
		if (this._speed == 0) {
			return;
		}
		switch (this._moveType) {
			case BulletMoveType.Linear:
				{
					const moveDelta = FVec2.MulN(FVec2.MulN(this.direction, this._speed), FMathUtils.Mul(0.001, dt));
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
}