import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";

export class Skill {
	public get id(): number { return this._id; }
	public get connectedState(): number { return this._connectState; }
	public get emitterID(): number { return this._emitterID; }
	public get bulletID(): number { return this._bulletID; }
	public get damage(): number { return this._damage; }

	private _id: number;
	private _connectState: number;
	private _emitterID: number;
	private _bulletID: number;
	private _damage: number;

	public Init(id: number) {
		this._id = id;
		this.LoadDef();
	}

	private LoadDef(): void {
		const def = Defs.GetSkill(this._id);
		this._connectState = Hashtable.GetNumber(def, "connect_state");
		this._emitterID = Hashtable.GetNumber(def, "emitter");
		this._bulletID = Hashtable.GetNumber(def, "bullet");
		this._damage = Hashtable.GetNumber(def, "damage");
	}
}