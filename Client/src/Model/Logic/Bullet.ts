import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { EntityType } from "../EntityType";
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
	public get type(): EntityType { return EntityType.Bullet; }

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

	protected OnInit(): void {
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}
}