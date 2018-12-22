import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
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
	public get def(): Hashtable { return this._def; }
	public get markToDestroy(): boolean { return this._markToDestroy; }

	public readonly attribute: Attribute = new Attribute();
	public readonly position: FVec2 = FVec2.zero;
	public readonly direction: FVec2 = FVec2.zero;

	protected readonly _battle: Battle;
	protected _rid: Long;
	protected _id: number;
	protected _def: Hashtable;
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
	protected OnInit(): void {
	}

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
		str += `attribute count:${this.attribute.count}\n`;
		this.attribute.Foreach((v, k) => {
			str += `  attr:${k}, v:${v}\n`;
		});
		return str;
	}
}