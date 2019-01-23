import * as Long from "../../../Libs/long";
import * as $protobuf from "../../../Libs/protobufjs";
import { FMathUtils } from "../../../RC/FMath/FMathUtils";
import { Logger } from "../../../RC/Utils/Logger";
import { ISnapshotable } from "../ISnapshotable";
import { StateType } from "../../StateEnums";
import { EAttr } from "../Attribute";
import { EntityAction } from "./EntityAction";

/**
 * 攻击行为
 */
export class ActAttack extends EntityAction implements ISnapshotable {
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
		this._casterID = this.owner.rid;
		this._skillID = this.owner.fsm.context.skillID;
		const skill = this.owner.GetSkill(this._skillID);
		skill.shakeTime = this.owner.fsm.context.shakeTime;
		if (skill == null) {
			Logger.Warn(`can not find skill:${this._skillID}`);
			this.owner.fsm.ChangeState(StateType.Idle);
		}
	}

	protected OnTrigger(): void {
		super.OnTrigger();
		const skill = this.owner.GetSkill(this._skillID);
		//扣除mp
		this.owner.SetAttr(EAttr.MP, FMathUtils.Sub(this.owner.mp, skill.mpCost));
		this.owner.battle.CreateEmitter(skill.emitterID, this._casterID, this._skillID);
	}

	public Dump(): string {
		let str = super.Dump();
		str += `caster id:${this._casterID}\n`;
		str += `skill id:${this._skillID}\n`;
		return str;
	}
}