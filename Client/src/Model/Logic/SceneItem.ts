import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { EAttr } from "./Attribute";
import { Entity, EntityInitParams } from "./Entity";

enum Op {
	Add,
	Mul,
	Pow,
	Sin,
	Cos
}

export class SceneItem extends Entity implements ISnapshotable {
	public get radius(): number { return this._radius; }

	private _radius: number;
	private _attrs: EAttr[];
	private _values: number[];
	private _ops: Op[];

	public Init(params: EntityInitParams): void {
		super.Init(params);
		this.position.CopyFrom(params.position);
		this.direction.CopyFrom(params.direction);
	}

	protected LoadDefs(): void {
		const defs = Defs.GetSceneItem(this._id);
		this._radius = Hashtable.GetNumber(defs, "radius");
		this._attrs = Hashtable.GetNumberArray(defs, "attrs");
		this._values = Hashtable.GetNumberArray(defs, "values");
		this._ops = Hashtable.GetNumberArray(defs, "ops");
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
	}

	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSync(writer);
	}

	public Intersect(): void {
	}
}