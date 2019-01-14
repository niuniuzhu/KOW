import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";

export class EntityInitParams {
	//entity
	public rid: Long;
	public id: number;
	//champion
	public team: number;
	public name: string;
	//bullet
	public casterID: Long;
	public skillID: number;
	public position: FVec2;
	public direction: FVec2;
}

export abstract class Entity implements ISnapshotable {
	public get battle(): Battle { return this._battle; }
	public get id(): number { return this._id; }
	public get rid(): Long { return this._rid; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	public readonly position: FVec2 = FVec2.zero;
	public readonly direction: FVec2 = FVec2.zero;

	protected readonly _battle: Battle;
	protected _rid: Long;
	protected _id: number;
	protected _markToDestroy: boolean;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Init(params: EntityInitParams): void {
		this._rid = params.rid;
		this._id = params.id;
		this._markToDestroy = false;
		this.LoadDefs();
	}

	protected abstract LoadDefs(): void;

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
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._rid = <Long>reader.uint64();
		this._id = reader.int32();
		this.LoadDefs();
		this._markToDestroy = reader.bool();
		this.position.Set(reader.double(), reader.double());
		this.direction.Set(reader.double(), reader.double());
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
	}

	public Update(dt: number): void {
	}

	public Dump(): string {
		let str = "";
		str += `rid:${this._rid.toString()}\n`;
		str += `id:${this._id}\n`;
		str += `markToDestroy:${this._markToDestroy}\n`;
		str += `positionX:${this.position.x}, positionY:${this.position.y}\n`;
		str += `directionX:${this.direction.x}, directionY:${this.direction.y}\n`;
		return str;
	}
}