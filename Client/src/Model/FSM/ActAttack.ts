import * as Long from "../../Libs/long";
import * as $protobuf from "../../Libs/protobufjs";
import { ISnapshotable } from "../ISnapshotable";
import { EntityState } from "./EntityState";
import { EntityStateAction } from "./EntityStateAction";

/**
 * 攻击行为
 */
export class ActAttack extends EntityStateAction implements ISnapshotable {
	private _casterID: Long = Long.ZERO;
	private _skillID: number = -1;

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
		const owner = (<EntityState>this.state).owner;
		this._casterID = owner.rid;
		for (let i = 0; i < owner.numSkills; ++i) {
			const skill = owner.GetSkillAt(i);
			if (skill.connectedState == this.state.type) {
				this._skillID = skill.id;
			}
		}
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		if (this._skillID == -1) {
			return;
		}
		const owner = (<EntityState>this.state).owner;
		const skill = owner.GetSkill(this._skillID);
		owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
	}

	public Dump(): string {
		let str = super.Dump();
		str += `caster id:${this._casterID}\n`;
		str += `skill id:${this._skillID}\n`;
		return str;
	}
}