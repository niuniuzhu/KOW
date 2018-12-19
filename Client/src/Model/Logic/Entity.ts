import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { EntityType } from "../EntityType";
import { EntityFSM } from "../FSM/EntityFSM";
import { ISnapshotable } from "../ISnapshotable";
import { Attribute } from "./Attribute";
import { Battle } from "./Battle";

export abstract class Entity implements ISnapshotable {
	public abstract get type(): EntityType;
	public get battle(): Battle { return this._battle; }
	public get id(): number { return this._id; }
	public get rid(): Long { return this._rid; }
	public get def(): Hashtable { return this._def; }
	public get fsm(): EntityFSM { return this._fsm; }

	public readonly attribute: Attribute = new Attribute();
	public position: FVec2 = FVec2.zero;
	public direction: FVec2 = FVec2.zero;

	protected _battle: Battle;
	protected _rid: Long;
	protected _id: number;
	protected _def: Hashtable;
	protected _fsm: EntityFSM

	constructor(battle: Battle, rid: Long, id: number) {
		this._battle = battle;
		this._rid = rid;
		this._id = id;
		this.LoadDef();
	}

	public Dispose(): void {
	}

	protected LoadDef(): void {
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._id);
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._id = reader.int32();
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public Update(dt: Decimal): void {
	}
}