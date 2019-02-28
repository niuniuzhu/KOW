import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";

export class Skill {
	public get id(): number { return this._id; }
	public get connectState(): number { return this._connectState; }
	public get mpCost(): number { return this._mpCost; }
	public get mpAdd(): number { return this._mpAdd; }
	public get emitterID(): number { return this._emitterID; }
	public get bulletID(): number { return this._bulletID; }
	public get damage(): number { return this._damage; }
	public get float(): number { return this._float; }
	public get formula(): string { return this._formula; }

	//runtime properties
	public shakeTime: number = 0;

	private _id: number;
	private _connectState: number;
	private _mpCost: number;
	private _mpAdd: number;
	private _emitterID: number;
	private _bulletID: number;
	private _damage: number;
	private _float: number;
	private _formula: string;

	public Init(id: number) {
		this._id = id;
		this.LoadDef();
	}

	private LoadDef(): void {
		const def = Defs.GetSkill(this._id);
		this._connectState = Hashtable.GetNumber(def, "connect_state");
		this._mpCost = Hashtable.GetNumber(def, "mp_cost");
		this._mpAdd = Hashtable.GetNumber(def, "mp_add");
		this._emitterID = Hashtable.GetNumber(def, "emitter");
		this._bulletID = Hashtable.GetNumber(def, "bullet");
		this._damage = Hashtable.GetNumber(def, "damage");
		this._float = Hashtable.GetNumber(def, "float");
		this._formula = Hashtable.GetString(def, "formula", null);
	}
}