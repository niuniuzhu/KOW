import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { HitUnit } from "./HitUnit";

/**
 * 受击管理器
 */
export class HitManager implements ISnapshotable {
	private _battle: Battle;
	private readonly _hitUnits: HitUnit[] = [];

	public get battle(): Battle { return this._battle; }

	public Init(battle: Battle): void {
		this._battle = battle;
	}

	public Destroy(): void {
		this._battle = null;
		this._hitUnits.splice(0);
	}

	public AddHitUnit(casterID: Long, targetID: Long, skillID: number): void {
		const hitUnit = new HitUnit(this);
		hitUnit.Init(casterID, targetID, skillID);
		this._hitUnits.push(hitUnit);
	}

	public Update(): void {
		for (const hitUnit of this._hitUnits) {
			hitUnit.CalcDamage();
		}
		this._hitUnits.splice(0);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		const count = this._hitUnits.length;
		writer.int32(count);
		for (let i = 0; i < count; ++i) {
			this._hitUnits[i].EncodeSnapshot(writer);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const hitUnit = new HitUnit(this);
			hitUnit.DecodeSnapshot(reader);
			this._hitUnits.push(hitUnit);
		}
	}
}