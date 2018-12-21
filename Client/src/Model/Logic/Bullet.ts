import * as $protobuf from "../../Libs/protobufjs";
import { Defs } from "../Defs";
import { ISnapshotable } from "../ISnapshotable";
import { Entity } from "./Entity";

export enum BulletMoveType {
	Linear,
	Ring,
	Follow,
}

export enum BulletShape {
	Circle,
	Rect
}

export class Bullet extends Entity implements ISnapshotable {
	private _moveType: BulletMoveType;
	private _speed: number;
	private _angleSpeed: number;
	private _angleRadius: number;
	private _lifeTime: number;
	private _collisionStartTime: number;
	private _maxCollisionCount: number;
	private _shape: BulletShape;
	private _shapeRadius: number;
	private _shapeWidth: number;
	private _shapHeight: number;

	//run time properties
	private _target: Entity;

	protected OnInit(): void {
		this._def = Defs.GetBullet(this._id);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}