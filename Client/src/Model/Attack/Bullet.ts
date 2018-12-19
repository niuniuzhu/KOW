import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { Entity } from "../Logic/Entity";

export enum BulletMoveType {
	Linear,
	Ring,
	Follow,
}

export enum BulletShape {
	Circle,
	Rect
}

export class Bullet implements ISnapshotable {
	private _moveType: BulletMoveType;
	private _speed: Decimal;
	private _angleSpeed: Decimal;
	private _angleRadius: Decimal;
	private _lifeTime: Decimal;
	private _collisionStartTime: Decimal;
	private _maxCollisionCount: number;
	private _shape: BulletShape;
	private _shapeRadius: Decimal;
	private _shapeWidth: Decimal;
	private _shapHeight: Decimal;

	//run time properties
	private _target: Entity;

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}