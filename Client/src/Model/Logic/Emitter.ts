import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { Champion } from "./Champion";
import Long = require("../../Libs/long");
import { EntityInitParams } from "./Entity";

enum EmitType {
	Center,
	Edage,
	Inside
}

enum DestroyType {
	Life,
	Bullet,
	Caster
}

export class Emitter implements ISnapshotable {
	public get rid(): Long { return this._rid; }
	public get id(): number { return this._id; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	private readonly _battle: Battle;
	private _rid: Long;
	private _id: number;
	/**
	 * 半径
	 */
	private _raduis: number;
	/**
	 * 相对caster的偏移量
	 */
	private _offset: FVec2;
	/**
	 * 相对caster的角度
	 */
	private _angle: number;
	/**
	 * 是否跟随caster
	 */
	private _follow: boolean;
	/**
	 * 发射频率
	 */
	private _frequency: number;
	/**
	 * 发射数量
	 */
	private _maxBulletCount: number;
	/**
	 * 生命周期
	 */
	private _lifeTime: number;
	/**
	 * 发射类型
	 */
	private _emitType: EmitType;
	/**
	 * 销毁类型
	 */
	private _destroyType: DestroyType;
	private _def: Hashtable;

	/**
	 * 产生者ID
	 */
	private _casterID: Long = Long.ZERO;
	/**
	 * 技能ID
	 */
	private _skillID: number = 0;
	private _markToDestroy: boolean;
	private _time: number;
	private _nextEmitTime: number;
	private _bulletCount: number;
	private readonly _position: FVec2 = FVec2.zero;
	private readonly _direction: FVec2 = FVec2.zero;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Init(rid: Long, id: number, casterID: Long, skillID: number): void {
		this._rid = rid;
		this._id = id;
		this.OnInit();
		this._casterID = casterID;
		this._skillID = skillID;
		this._markToDestroy = false;
		this._time = 0;
		this._nextEmitTime = 0;
		//place it
		const caster = this._battle.GetChampion(this._casterID);
		this.UpdatePosition(caster);
		this._direction.CopyFrom(caster.direction);
		if (this._angle != 0) {
			this._direction.Rotate(this._angle);
		}
	}

	/**
	 * 在初始化或解码快照后执行
	 */
	private OnInit(): void {
		this._def = Defs.GetEmitter(this._id);
		this._raduis = Hashtable.GetNumber(this._def, "radius");
		const mOffset = Hashtable.GetVec2(this._def, "offset");
		this._offset = new FVec2(mOffset.x, mOffset.y);
		this._angle = Hashtable.GetNumber(this._def, "angle");
		this._follow = Hashtable.GetBool(this._def, "follow");
		this._frequency = Hashtable.GetNumber(this._def, "frequency");
		this._maxBulletCount = Hashtable.GetNumber(this._def, "max_bullet_count", 1);
		this._lifeTime = Hashtable.GetNumber(this._def, "life_time", -1);
		this._emitType = Hashtable.GetNumber(this._def, "emit_type");
		this._destroyType = Hashtable.GetNumber(this._def, "destroy_type");
	}

	public Destroy(): void {
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._rid);
		writer.int32(this._id);
		writer.uint64(this._casterID);
		writer.int32(this._skillID);
		writer.bool(this._markToDestroy);
		writer.int32(this._time);
		writer.int32(this._nextEmitTime);
		writer.int32(this._bulletCount);
		writer.double(this._position.x).double(this._position.y);
		writer.double(this._direction.x).double(this._direction.y);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this.OnInit();
		this._casterID = <Long>reader.uint64();
		this._skillID = reader.int32();
		this._markToDestroy = reader.bool();
		this._time = reader.int32();
		this._nextEmitTime = reader.int32();
		this._bulletCount = reader.int32();
		this._position.Set(reader.double(), reader.double());
		this._direction.Set(reader.double(), reader.double());
	}

	public Update(dt: number): void {
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

			case DestroyType.Bullet:
				//todo
				break;
		}
		if (this._follow) {
			this.UpdatePosition();
		}
		if (this._time > this._nextEmitTime) {
			//更新下次发射的时间,需补偿此次多出的时间
			this._nextEmitTime = this._time + this._frequency - (this._time - this._nextEmitTime);
			//发射子弹
			if (this._bulletCount < this._maxBulletCount) {
				this.Emit();
				++this._bulletCount;
			}
		}
	}

	private UpdatePosition(caster?: Champion): void {
		if (caster == null) {
			caster = this._battle.GetChampion(this._casterID);
		}
		this._position.CopyFrom(caster.position);
		this._position.Add(this._offset);
	}

	private Emit(): void {
		const caster = this._battle.GetChampion(this._casterID);
		const skill = caster.GetSkill(this._skillID);
		switch (this._emitType) {
			case EmitType.Center:
				this._battle.CreateBullet(skill.emitterID, this._casterID, this._skillID,
					new FVec2(this._position.x, this._position.y), new FVec2(this._direction.x, this._direction.y));
				break;

			case EmitType.Edage:
				//todo
				break;

			case EmitType.Inside:
				//todo
				break;
		}
	}

	public Dump(): string {
		let str = "";
		str += `rid:${this._rid.toNumber()}\n`;
		str += `id:${this._id}\n`;
		str += `caster id:${this._casterID}\n`;
		str += `skill id:${this._skillID}\n`;
		str += `markToDestroy:${this._markToDestroy}\n`;
		str += `time:${this._time}\n`;
		str += `next emmit time:${this._nextEmitTime}\n`;
		str += `positionX:${this._position.x}, positionY:${this._position.y}\n`;
		str += `directionX:${this._direction.x}, directionY:${this._direction.y}\n`;
		return str;
	}
}