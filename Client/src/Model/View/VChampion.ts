import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { FSM } from "../../RC/Framework/FSM/FSM";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { UIEvent } from "../BattleEvent/UIEvent";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { EAttr } from "../Logic/Attribute";
import { Skill } from "../Skill";
import { VEntityState } from "./FSM/VEntityState";
import { HUD } from "./HUD";
import { VBattle } from "./VBattle";
import { VEntity } from "./VEntity";

export class VChampion extends VEntity {
	public self: boolean = false;
	public get hud(): HUD { return this._hud; }
	public get fsm(): FSM { return this._fsm; }
	public get radius(): number { return this._radius; }
	public get moveSpeed(): number { return this._moveSpeed; }

	//static properties
	private readonly _hud: HUD;
	private readonly _skills: Skill[] = [];
	private readonly _fsm: FSM = new FSM();
	private _radius: number;
	private _moveSpeed: number;

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
	public set t_hp_add(value: number) { if (this._t_hp_add == value) return; this._t_hp_add = value; this.OnAttrChange(EAttr.S_HP_ADD, value); }
	public set t_mp_add(value: number) { if (this._t_mp_add == value) return; this._t_mp_add = value; this.OnAttrChange(EAttr.S_MP_ADD, value); }
	public set t_atk_add(value: number) { if (this._t_atk_add == value) return; this._t_atk_add = value; this.OnAttrChange(EAttr.S_ATK_ADD, value); }
	public set t_def_add(value: number) { if (this._t_def_add == value) return; this._t_def_add = value; this.OnAttrChange(EAttr.S_DEF_ADD, value); }
	public set t_speed_add(value: number) { if (this._t_speed_add == value) return; this._t_speed_add = value; this.OnAttrChange(EAttr.S_SPEED_ADD, value); }

	constructor(battle: VBattle) {
		super(battle);
		this._hud = new HUD(this);
	}

	public Destroy(): void {
		this._hud.Destroy();
		super.Destroy()
	}

	protected LoadDef(): Hashtable {
		return Defs.GetEntity(this.id);
	}

	protected AfterLoadDef(defs: Hashtable): void {
		this._radius = Hashtable.GetNumber(defs, "radius");
		this._moveSpeed = Hashtable.GetNumber(defs, "move_speed");
		const skillsDef = Hashtable.GetNumberArray(defs, "skills");
		for (const sid of skillsDef) {
			const skill = new Skill();
			skill.Init(sid);
			this._skills.push(skill);
		}
	}

	protected LoadCDef(): Hashtable {
		return CDefs.GetEntity(this.id);
	}

	protected AfterLoadCDef(cdefs: Hashtable): void {
		const statesDef = Hashtable.GetMap(cdefs, "states");
		if (statesDef != null) {
			for (const type in statesDef) {
				const state = new VEntityState(Number.parseInt(type), this);
				state.Init(statesDef[type]);
				this._fsm.AddState(state);
			}
		}
		this.DisplayRoot();
	}

	private OnAttrChange(attr: EAttr, value: any): void {
		UIEvent.AttrChange(this, attr, value);
	}

	public Update(dt: number): void {
		super.Update(dt);
		this._fsm.Update(dt);
		this._hud.Update(dt);
	}

	public DecodeSync(rid: Long, reader: $protobuf.Reader | $protobuf.BufferReader, isNew: boolean): void {
		super.DecodeSync(rid, reader, isNew);
		if (isNew) {
			UIEvent.ChampionInit(this);
		}
		this.self = this.rid.equals(Global.battleManager.playerID);
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
		this.t_hp_add = reader.int32();
		this.t_mp_add = reader.int32();
		this.t_atk_add = reader.int32();
		this.t_def_add = reader.int32();
		this.t_speed_add = reader.int32();
		//read fsmstates
		if (reader.bool()) {
			const stateType = reader.int32();
			this._fsm.ChangeState(stateType, null);
			(<VEntityState>this._fsm.currentState).time = reader.int32();
		}
		this._hud.OnDecodeSync();
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

	public ShowDecal(): void {
		const decal = fairygui.UIPackage.createObject("battle", "decal").asCom;
		this.root.addChildAt(decal, 0);
	}
}