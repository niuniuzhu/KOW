import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { Skill } from "../Skill";
import { Battle } from "./Battle";
import { Champion } from "./Champion";

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

	private _def: Hashtable;
	private _caster: Champion;
	private _skill: Skill;
	private _markToDestroy: boolean = false;

	//runtime properties
	private _time: Decimal;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._rid);
		writer.int32(this._id);
		writer.bool(this._markToDestroy);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this._markToDestroy = reader.bool();
	}

	public Init(rid: Long, id: number, caster: Champion, skill: Skill): void {
		this._rid = rid;
		this._id = id;
		this.OnInit();
	}

	private OnInit(): void {
		this._def = Defs.GetBullet(this._id);
		this._raduis = new Decimal(Hashtable.GetNumber(this._def, "radius"));
		const mOffset = Hashtable.GetVec2(this._def, "offset");
		this._offset = new FVec2(new Decimal(mOffset.x), new Decimal(mOffset.y));
		this._angle = new Decimal(Hashtable.GetNumber(this._def, "angle"));
		this._follow = Hashtable.GetBool(this._def, "follow");
		this._frequency = new Decimal(Hashtable.GetNumber(this._def, "frequency"));
		this._lifeTime = new Decimal(Hashtable.GetNumber(this._def, "lifeTime"));
		this._mouthType = Hashtable.GetNumber(this._def, "mouthType");
		this._time = new Decimal(0);
	}

	public Destroy(): void {

	}

	public Update(dt: Decimal): void {
		this._time = this._time.add(dt);
		if (this._time.greaterThanOrEqualTo(this._lifeTime)) {
			this._markToDestroy = true;
		}
	}
}