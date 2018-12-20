import * as $protobuf from "../../Libs/protobufjs";
import { Skill } from "../Skill";
import { VEntity } from "./VEntity";
import { Vec2 } from "../../RC/Math/Vec2";

export class VChampion extends VEntity {
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }

	private _team: number;
	private _name: string;
	private readonly _skills: Skill[] = [];

	public InitSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.InitSync(reader);

		this._team = reader.int32();
		this._name = reader.string();
		const speed = new Vec2(reader.float(), reader.float());

		//init skills
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			const skill = new Skill();
			skill.Init(reader.int32());
			this._skills.push(skill);
		}
	}

	public DecodeSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSync(reader);

		this._team = reader.int32();
		this._name = reader.string();
		const speed = new Vec2(reader.float(), reader.float());

		//read skills
		const count = reader.int32();
		for (let i = 0; i < count; ++i) {
			reader.int32();
		}
	}

	/**
	 * 是否存在指定id的技能
	 * @param id 技能id
	 */
	public HasSkill(id: number): boolean {
		for (const skill of this._skills) {
			if (skill.id == id)
				return true;
		}
		return false;
	}

	/**
	 * 获取指定id的技能
	 * @param id 技能id
	 */
	public GetSkill(id: number): Skill {
		for (const skill of this._skills) {
			if (skill.id == id)
				return skill;
		}
		return null;
	}

	/**
	 * 获取指定索引的技能
	 * @param index 索引
	 */
	public GetSkillAt(index: number): Skill {
		return this._skills[index];
	}
}