import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityFSM } from "../FSM/EntityFSM";
import { EntityState } from "../FSM/EntityState";
import { ISnapshotable } from "../ISnapshotable";
import { Attribute } from "./Attribute";
import { Battle } from "./Battle";

export class EntityInitParams {
	//entity
	public rid: Long;
	public id: number;
	//champion
	public team: number;
	public name: string;
}

export abstract class Entity implements ISnapshotable {
	public get battle(): Battle { return this._battle; }
	public get id(): number { return this._id; }
	public get rid(): Long { return this._rid; }
	public get def(): Hashtable { return this._def; }
	public get fsm(): EntityFSM { return this._fsm; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	public readonly attribute: Attribute = new Attribute();
	public readonly position: FVec2 = FVec2.zero;
	public readonly direction: FVec2 = FVec2.zero;

	protected readonly _battle: Battle;
	protected _rid: Long;
	protected _id: number;
	protected _def: Hashtable;
	protected _fsm: EntityFSM;
	protected _markToDestroy: boolean;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Init(params: EntityInitParams): void {
		this._rid = params.rid;
		this._id = params.id;
		this._markToDestroy = false;
		this.OnInit();
	}

	/**
	 * 在初始化后或解码快照时执行
	 */
	protected abstract OnInit(): void;

	public Destroy(): void {
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._rid);
		writer.int32(this._id);
		writer.bool(this._markToDestroy);
		writer.double(this.position.x).double(this.position.y);
		writer.double(this.direction.x).double(this.direction.y);

		//encode attributes
		const count = this.attribute.count;
		writer.int32(count);
		this.attribute.Foreach((v, k) => {
			writer.int32(k).double(v);
		});

		//encode fsmstates
		this._fsm.EncodeSnapshot(writer);
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this.OnInit();
		this._markToDestroy = reader.bool();
		this.position.Set(reader.double(), reader.double());
		this.direction.Set(reader.double(), reader.double());

		//decode attributes
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			this.attribute.Set(reader.int32(), reader.double());
		}

		//decode fsmstates
		this._fsm.DecodeSnapshot(reader);
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._rid);
		writer.int32(this._id);
		writer.bool(this._markToDestroy);
		writer.double(this.position.x).double(this.position.y);
		writer.double(this.direction.x).double(this.direction.y);

		//sync attributes
		const count = this.attribute.count;
		writer.int32(count);
		this.attribute.Foreach((v, k, map) => {
			writer.int32(k).double(v);
		});

		//sync fsmstates
		writer.int32(this._fsm.currentState.type);
		writer.double((<EntityState>this._fsm.currentState).time);
	}

	public Update(dt: number): void {
	}
}