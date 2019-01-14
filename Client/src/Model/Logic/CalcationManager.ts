import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { Battle } from "./Battle";
import { HitUnit } from "./HitUnit";
import { ItemUnit } from "./ItemUnit";

/**
 * 数值计算管理器
 */
export class CalcationManager implements ISnapshotable {
	private readonly _battle: Battle;
	private readonly _itemUnits: ItemUnit[] = [];
	private readonly _hitUnits: HitUnit[] = [];

	public get battle(): Battle { return this._battle; }

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Destroy(): void {
		this._itemUnits.splice(0);
		this._hitUnits.splice(0);
	}

	public AddItemUnit(itemID: Long, targetID: Long): void {
		const itemUnit = new ItemUnit(this);
		itemUnit.Init(itemID, targetID);
		this._itemUnits.push(itemUnit);
	}

	public AddHitUnit(casterID: Long, targetID: Long, skillID: number): void {
		const hitUnit = new HitUnit(this);
		hitUnit.Init(casterID, targetID, skillID);
		this._hitUnits.push(hitUnit);
	}

	public Update(): void {
		for (const itemUnit of this._itemUnits) {
			itemUnit.Calculate();
		}
		this._itemUnits.splice(0);

		for (const hitUnit of this._hitUnits) {
			hitUnit.Calculate();
		}
		this._hitUnits.splice(0);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		let count = this._itemUnits.length;
		writer.int32(count);
		for (let i = 0; i < count; ++i) {
			this._itemUnits[i].EncodeSnapshot(writer);
		}
		count = this._hitUnits.length;
		writer.int32(count);
		for (let i = 0; i < count; ++i) {
			this._hitUnits[i].EncodeSnapshot(writer);
		}
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		let count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const itemUnit = new ItemUnit(this);
			itemUnit.DecodeSnapshot(reader);
			this._itemUnits.push(itemUnit);
		}
		count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const hitUnit = new HitUnit(this);
			hitUnit.DecodeSnapshot(reader);
			this._hitUnits.push(hitUnit);
		}
	}
}