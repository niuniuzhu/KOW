import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { Champion } from "./Champion";
import Long = require("../../Libs/long");
import { Logger } from "../../RC/Utils/Logger";

export enum EmitterMouthType {
	Center,
	Edage,
	Inside
}

export class Emitter implements ISnapshotable {
	public get rid(): Long { return this._rid; }
	public get id(): number { return this._id; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	private readonly _battle: Battle;
	private _rid: Long;
	private _id: number;
	private _raduis: Decimal;
	private _offset: FVec2;
	private _angle: Decimal;
	private _follow: boolean;
	private _frequency: Decimal;
	private _lifeTime: Decimal;
	private _mouthType: EmitterMouthType;
	private _destroyWhenDie: boolean;
	private _def: Hashtable;

	//runtime properties
	private _casterID: Long = Long.ZERO;
	private _skillID: number = 0;
	private _markToDestroy: boolean;
	private _time: Decimal;
	private _nextEmitTime: Decimal;
	private readonly _position: FVec2 = FVec2.zero;
	private readonly _direction: FVec2 = FVec2.zero;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Init(rid: Long, id: number, casterID: Long, skillID: number): void {
		this._rid = rid;
		this._id = id;
		this._casterID = casterID;
		this._skillID = skillID;
		this._markToDestroy = false;
		this._time = new Decimal(0);
		this._nextEmitTime = new Decimal(0);

		this.OnInit();

		//place it
		const caster = this._battle.GetChampion(this._casterID);
		this.UpdatePosition(caster);
		this._direction.CopyFrom(caster.direction);
		if (!this._angle.equals(FMathUtils.D_ZERO)) {
			this._direction.Rotate(this._angle);
		}
	}

	/**
	 * 在初始化或解码快照后执行
	 */
	private OnInit(): void {
		this._def = Defs.GetEmitter(this._id);
		this._raduis = new Decimal(Hashtable.GetNumber(this._def, "radius"));
		const mOffset = Hashtable.GetVec2(this._def, "offset");
		this._offset = new FVec2(new Decimal(mOffset.x), new Decimal(mOffset.y));
		this._angle = new Decimal(Hashtable.GetNumber(this._def, "angle"));
		this._follow = Hashtable.GetBool(this._def, "follow");
		this._frequency = new Decimal(Hashtable.GetNumber(this._def, "frequency"));
		this._lifeTime = new Decimal(Hashtable.GetNumber(this._def, "lifeTime"));
		this._mouthType = Hashtable.GetNumber(this._def, "mouthType");
		this._destroyWhenDie = Hashtable.GetBool(this._def, "destroyWhenDie");
	}

	public Destroy(): void {
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._rid);
		writer.int32(this._id);
		writer.uint64(this._casterID);
		writer.int32(this._skillID);
		writer.bool(this._markToDestroy);
		writer.float(this._time.toNumber());
		writer.float(this._nextEmitTime.toNumber());
		writer.float(this._position.x.toNumber()).float(this._position.y.toNumber());
		writer.float(this._direction.x.toNumber()).float(this._direction.y.toNumber());
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this.OnInit();
		this._casterID = <Long>reader.uint64();
		this._skillID = reader.int32();
		this._markToDestroy = reader.bool();
		this._time = new Decimal(reader.float());
		this._nextEmitTime = new Decimal(reader.float());
		this._position.Set(new Decimal(reader.float()), new Decimal(reader.float()));
		this._direction.Set(new Decimal(reader.float()), new Decimal(reader.float()));
	}

	public Update(dt: Decimal): void {
		this._time = this._time.add(dt);
		Logger.Log(this._position.x.toNumber());
		if (this._time.greaterThanOrEqualTo(this._lifeTime)) {
			this._markToDestroy = true;
		}
		if (this._follow) {
			this.UpdatePosition();
		}
		if (this._time.greaterThanOrEqualTo(this._nextEmitTime)) {
			//更新下次发射的时间,需补偿此次多出的时间
			this._nextEmitTime = this._nextEmitTime.add(this._frequency).sub(this._time.sub(this._nextEmitTime));
			//发射子弹
			const caster = this._battle.GetChampion(this._casterID);
			const skill = caster.GetSkill(this._skillID);

		}
	}

	private UpdatePosition(caster?: Champion): void {
		if (caster == null) {
			caster = this._battle.GetChampion(this._casterID);
		}
		this._position.CopyFrom(caster.position);
		this._position.Add(this._offset);
	}
}