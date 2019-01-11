import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { ISnapshotable } from "../ISnapshotable";
import { EAttr } from "./Attribute";
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
		let commonDmg = FMathUtils.Sub(caster.atk, target.def);
		commonDmg = commonDmg < 0 ? 0 : commonDmg;
		const totalDmg = FMathUtils.Add(commonDmg, skill.damage);

		//minus hp
		let hp = target.GetAttr(EAttr.HP);
		hp -= totalDmg;
		hp = hp < 0 ? 0 : hp
		target.SetAttr(EAttr.HP, hp);

		//mp
		target.SetAttr(EAttr.MP, FMathUtils.Add(target.mp, skill.mpAdd));

		if (!caster.battle.chase) {
			SyncEvent.Hit(target.rid, totalDmg);
		}
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