import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";
import * as Long from "../../Libs/long";

/**
 * 攻击行为
 */
export class ActAttack extends EntityStateAction implements ISnapshotable {
	private _casterID: Long = Long.ZERO;
	private _skillID: number = 0;

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		super.EncodeSnapshot(writer);
		writer.uint64(this._casterID);
		writer.int32(this._skillID);
	}

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSnapshot(reader);
		this._casterID = <Long>reader.uint64();
		this._skillID = reader.int32();
	}

	protected OnEnter(param: any): void {
		super.OnEnter(param);
		this._casterID = <Long>param[0];
		this._skillID = <number>param[1];
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		const owner = (<EntityState>this.state).owner;
		const caster = owner.battle.GetChampion(this._casterID);
		const skill = caster.GetSkill(this._skillID);
		owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
	}

	public Dump(): string {
		let str = super.Dump();
		str +=`caster id:${this._casterID}\n`;
		str +=`skill id:${this._skillID}\n`;
		return str;
	}
}