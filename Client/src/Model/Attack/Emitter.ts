import Decimal from "../../Libs/decimal";
import * as $protobuf from "../../Libs/protobufjs";
import { FVec2 } from "../../RC/FMath/FVec2";
import { ISnapshotable } from "../ISnapshotable";
import { Entity } from "../Logic/Entity";
import { Skill } from "../Skill";
import { Battle } from "../Logic/Battle";

export enum EmitterMouthType {
	Center,
	Edage,
	Inside
}

export class Emitter implements ISnapshotable {
	private _id: number;
	private _raduis: Decimal;
	private _offset: FVec2;
	private _angle: Decimal;
	private _follow: boolean;
	private _frequency: Decimal;
	private _lifeTime: Decimal;
	private _mouthType: EmitterMouthType;

	//runtime properties
	private _rid: Long;

	constructor() {
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
	}

	public Init(battle: Battle, id: number, rid: Long, caster: Entity, skill: Skill): void {
	}

	private LoadDef(): void {
	}
}