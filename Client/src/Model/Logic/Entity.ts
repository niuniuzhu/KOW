import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityType } from "../EntityType";
import { EntityFSM } from "../FSM/EntityFSM";
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
	public abstract get type(): EntityType;
	public get battle(): Battle { return this._battle; }
	public get id(): number { return this._id; }
	public get rid(): Long { return this._rid; }
	public get def(): Hashtable { return this._def; }
	public get fsm(): EntityFSM { return this._fsm; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	public readonly attribute: Attribute = new Attribute();
	public position: FVec2 = FVec2.zero;
	public direction: FVec2 = FVec2.zero;

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
		this.InternalInit(params);
		this.OnInit();
	}

	protected InternalInit(params: EntityInitParams): void {
		this._rid = params.rid;
		this._id = params.id;
		this._markToDestroy = false;
	}

	public Destroy(): void {
	}

	protected abstract OnInit(): void;

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._rid);
		writer.int32(this._id);
		writer.bool(this._markToDestroy);
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this._markToDestroy = reader.bool();
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public Update(dt: Decimal): void {
	}
}