import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { VEntityState } from "../FSM/VEntityState";
import { Skill } from "../Skill";
import { HUD } from "./HUD";
import { VBattle } from "./VBattle";
import { VEntity } from "./VEntity";

export class VChampion extends VEntity {
	//static properties
	private readonly _hud: HUD;
	private readonly _skills: Skill[] = [];
	private readonly _fsm: FSM = new FSM();

	public get hud(): HUD { return this._hud; }
	public get fsm(): FSM { return this._fsm; }

	//runtime properties
	public team: number;
	public name: string;
	public hp: number;
	public mhp: number;
	public mp: number;
	public mmp: number;
	public atk: number;
	public def: number;
	public disableMove: number;
	public disableTurn: number;
	public disableSkill: number;
	public disableCollision: number;
	public supperArmor: number;
	public invulnerAbility: number;
	public readonly moveDirection: Vec2 = Vec2.zero;
	public gladiatorTime: number;
	//临时属性
	public t_hp_add: number = 0;
	public t_mp_add: number = 0;
	public t_atk_add: number = 0;
	public t_def_add: number = 0;
	public t_speed_add: number = 0;

	constructor(battle: VBattle) {
		super(battle);
		this._hud = new HUD(this);
	}

	protected LoadDefs(): void {
		this._defs = Defs.GetEntity(this._id);
		this._cdefs = CDefs.GetEntity(this._id);
	}

	protected OnInit(): void {
		super.OnInit();

		const skillsDef = Hashtable.GetNumberArray(this._defs, "skills");
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		const statesDef = Hashtable.GetMap(this._defs, "states");
		if (statesDef != null) {
			for (const type in statesDef) {
				this._fsm.AddState(new VEntityState(Number.parseInt(type), this));
			}
		}
	}

	public Update(dt: number): void {
		super.Update(dt);
		this._hud.Update(dt);
	}

	public DecodeSync(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader, isNew: boolean): void {
		super.DecodeSync(rid, reader, isNew);
		this.team = reader.int32();
		this.name = reader.string();
		this.hp = reader.int32();
		this.mhp = reader.int32();
		this.mp = reader.int32();
		this.mmp = reader.int32();
		this.atk = reader.int32();
		this.def = reader.int32();
		this.disableMove = reader.int32();
		this.disableTurn = reader.int32();
		this.disableSkill = reader.int32();
		this.disableCollision = reader.int32();
		this.supperArmor = reader.int32();
		this.invulnerAbility = reader.int32();
		this.moveDirection.Set(reader.double(), reader.double());
		this.gladiatorTime = reader.int32();
		this.t_hp_add = reader.int32();
		this.t_mp_add = reader.int32();
		this.t_atk_add = reader.int32();
		this.t_def_add = reader.int32();
		this.t_speed_add = reader.int32();

		//read fsmstates
		if (reader.bool()) {
			this._fsm.ChangeState(reader.int32(), null);
			(<VEntityState>this._fsm.currentState).time = reader.double();
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