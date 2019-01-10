import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/FSM/FSM";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { UIEvent } from "../BattleEvent/UIEvent";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { EAttr } from "../Logic/Attribute";
import { Skill } from "../Skill";
import { AnimationProxy } from "./AnimationProxy";
import { VEntityState } from "./FSM/VEntityState";
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
	private _hp: number;
	private _mhp: number;
	private _mp: number;
	private _mmp: number;
	private _mpRecover: number;
	private _atk: number;
	private _def: number;
	private _disableMove: number;
	private _disableTurn: number;
	private _disableSkill: number;
	private _disableCollision: number;
	private _supperArmor: number;
	private _invulnerAbility: number;
	private readonly _moveDirection: Vec2 = Vec2.zero;
	private _gladiatorTime: number;
	//临时属性
	private _t_hp_add: number = 0;
	private _t_mp_add: number = 0;
	private _t_atk_add: number = 0;
	private _t_def_add: number = 0;
	private _t_speed_add: number = 0;

	public get hp(): number { return this._hp; }
	public get mhp(): number { return this._mhp; }
	public get mp(): number { return this._mp; }
	public get mmp(): number { return this._mmp; }
	public get mpRecover(): number { return this._mpRecover; }
	public get atk(): number { return this._atk; }
	public get def(): number { return this._def; }
	public get disableMove(): number { return this._disableMove; }
	public get disableTurn(): number { return this._disableTurn; }
	public get disableSkill(): number { return this._disableSkill; }
	public get disableCollision(): number { return this._disableCollision; }
	public get supperArmor(): number { return this._supperArmor; }
	public get invulnerAbility(): number { return this._invulnerAbility; }
	public get moveDirection(): Vec2 { return this._moveDirection; }
	public get gladiatorTime(): number { return this._gladiatorTime; }
	public get t_hp_add(): number { return this._t_hp_add; }
	public get t_mp_add(): number { return this._t_mp_add; }
	public get t_atk_add(): number { return this._t_atk_add; }
	public get t_def_add(): number { return this._t_def_add; }
	public get t_speed_add(): number { return this._t_speed_add; }

	public set hp(value: number) { if (this._hp == value) return; this._hp = value; this.OnAttrChange(EAttr.HP, value); }
	public set mhp(value: number) { if (this._mhp == value) return; this._mhp = value; this.OnAttrChange(EAttr.MHP, value); }
	public set mp(value: number) { if (this._mp == value) return; this._mp = value; this.OnAttrChange(EAttr.MP, value); }
	public set mmp(value: number) { if (this._mmp == value) return; this._mmp = value; this.OnAttrChange(EAttr.MMP, value); }
	public set mpRecover(value: number) { if (this._mpRecover == value) return; this._mpRecover = value; this.OnAttrChange(EAttr.MP_RECOVER, value); }
	public set atk(value: number) { if (this._atk == value) return; this._atk = value; this.OnAttrChange(EAttr.ATK, value); }
	public set def(value: number) { if (this._def == value) return; this._def = value; this.OnAttrChange(EAttr.DEF, value); }
	public set disableMove(value: number) { if (this._disableMove == value) return; this._disableMove = value; this.OnAttrChange(EAttr.S_DISABLE_MOVE, value); }
	public set disableTurn(value: number) { if (this._disableTurn == value) return; this._disableTurn = value; this.OnAttrChange(EAttr.S_DISABLE_TURN, value); }
	public set disableSkill(value: number) { if (this._disableSkill == value) return; this._disableSkill = value; this.OnAttrChange(EAttr.S_DISABLE_SKILL, value); }
	public set disableCollision(value: number) { if (this._disableCollision == value) return; this._disableCollision = value; this.OnAttrChange(EAttr.S_DISABLE_COLLISION, value); }
	public set supperArmor(value: number) { if (this._supperArmor == value) return; this._supperArmor = value; this.OnAttrChange(EAttr.S_SUPPER_ARMOR, value); }
	public set invulnerAbility(value: number) { if (this._invulnerAbility == value) return; this._invulnerAbility = value; this.OnAttrChange(EAttr.S_INVULNER_ABILITY, value); }
	public set moveDirection(value: Vec2) { if (this._moveDirection.EqualsTo(value)) return; this._moveDirection.CopyFrom(value); this.OnAttrChange(EAttr.MOVE_DIRECTION, value); }
	public set gladiatorTime(value: number) { if (this._gladiatorTime == value) return; this._gladiatorTime = value; this.OnAttrChange(EAttr.GLADIATOR_TIME, value); }
	public set t_hp_add(value: number) { if (this._t_hp_add == value) return; this._t_hp_add = value; this.OnAttrChange(EAttr.S_HP_ADD, value); }
	public set t_mp_add(value: number) { if (this._t_mp_add == value) return; this._t_mp_add = value; this.OnAttrChange(EAttr.S_MP_ADD, value); }
	public set t_atk_add(value: number) { if (this._t_atk_add == value) return; this._t_atk_add = value; this.OnAttrChange(EAttr.S_ATK_ADD, value); }
	public set t_def_add(value: number) { if (this._t_def_add == value) return; this._t_def_add = value; this.OnAttrChange(EAttr.S_DEF_ADD, value); }
	public set t_speed_add(value: number) { if (this._t_speed_add == value) return; this._t_speed_add = value; this.OnAttrChange(EAttr.S_SPEED_ADD, value); }

	constructor(battle: VBattle) {
		super(battle);
		this._hud = new HUD(this);
	}

	protected LoadDefs(): void {
		const defs = Defs.GetEntity(this._id);
		const cdefs = CDefs.GetEntity(this._id);

		//加载动画数据
		const modelID = Hashtable.GetNumber(cdefs, "model", -1);
		if (modelID >= 0) {
			this._animationProxy = new AnimationProxy(modelID);
			this._root.addChild(this._animationProxy);
		}

		const skillsDef = Hashtable.GetNumberArray(defs, "skills");
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}

		const statesDef = Hashtable.GetMap(cdefs, "states");
		if (statesDef != null) {
			for (const type in statesDef) {
				const state = new VEntityState(Number.parseInt(type), this);
				this._fsm.AddState(state);
				state.Init(statesDef);
			}
		}
	}

	private OnAttrChange(attr: EAttr, value: any): void {
		UIEvent.AttrChange(this, attr, value);
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
		this.mp = reader.double();
		this.mmp = reader.int32();
		this.mpRecover = reader.int32();
		this.atk = reader.int32();
		this.def = reader.int32();
		this.disableMove = reader.int32();
		this.disableTurn = reader.int32();
		this.disableSkill = reader.int32();
		this.disableCollision = reader.int32();
		this.supperArmor = reader.int32();
		this.invulnerAbility = reader.int32();
		this.moveDirection = new Vec2(reader.double(), reader.double());
		this.gladiatorTime = reader.int32();
		this.t_hp_add = reader.int32();
		this.t_mp_add = reader.int32();
		this.t_atk_add = reader.int32();
		this.t_def_add = reader.int32();
		this.t_speed_add = reader.int32();

		//read fsmstates
		if (reader.bool()) {
			const stateType = reader.int32();
			this._fsm.ChangeState(stateType, null);
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