import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { HitManager } from "./HitManager";

/**
 * 受击单元
 */
export class HitUnit implements ISnapshotable {
	private _manager: HitManager;
	private _casterID: Long;
	private _targetID: Long;
	private _skillID: number;

	constructor(manager: HitManager) {
		this._manager = manager;
	}

	public Init(casterID: Long, targetID: Long, skillID: number): void {
		this._casterID = casterID;
		this._targetID = targetID;
		this._skillID = skillID;
	}

	public CalcDamage(): void {
		const caster = this._manager.battle.GetChampion(this._casterID);
		const target = this._manager.battle.GetChampion(this._targetID);
		const skill = caster.GetSkill(this._skillID);

		//simple calc
		let commonDmg = caster.atk - target.def;
		commonDmg = commonDmg < 0 ? 0 : commonDmg;
		const totalDmg = commonDmg + skill.damage;

		//minus hp
		target.hp -= totalDmg;
		target.hp = target.hp < 0 ? 0 : target.hp
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.uint64(this._casterID);
		writer.uint64(this._targetID);
		writer.int32(this._skillID);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._casterID = <Long>reader.uint64();
		this._targetID = <Long>reader.uint64();
		this._skillID = reader.int32();
	}
}