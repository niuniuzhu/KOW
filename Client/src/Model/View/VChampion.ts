import * as $protobuf from "../../Libs/protobufjs";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { StateType } from "../FSM/StateEnums";
import { VEntityState } from "../FSM/VEntityState";
import { Skill } from "../Skill";
import { VEntity } from "./VEntity";

export class VChampion extends VEntity {
	public get team(): number { return this._team; }
	public get name(): string { return this._name; }

	private _team: number;
	private _name: string;
	private _skills: Skill[];
	private readonly _moveSpeed: Vec2 = Vec2.zero;

	protected OnInit(): void {
		super.OnInit();

		this._skills = [];
		const skillsDef = Hashtable.GetNumberArray(this._def, "skills");
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		this._fsm.AddState(new VEntityState(StateType.Idle, this));
		this._fsm.AddState(new VEntityState(StateType.Move, this));
		this._fsm.AddState(new VEntityState(StateType.Attack, this));
		this._fsm.AddState(new VEntityState(StateType.Die, this));
	}

	public InitSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.InitSync(reader);
		this._team = reader.int32();
		this._name = reader.string();
		this._moveSpeed.Set(reader.double(), reader.double());
	}

	public DecodeSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		super.DecodeSync(reader);
		this._team = reader.int32();
		this._name = reader.string();
		this._moveSpeed.Set(reader.double(), reader.double());
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