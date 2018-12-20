import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";

export class Skill {
	public get id(): number { return this._id; }
	public get connectedState(): number { return this._connectState; }
	public get emitterID(): number { return this._emitterID; }
	public get bulletID(): number { return this._bulletID; }

	private _id: number;
	private _def: Hashtable;
	private _connectState: number;
	private _emitterID: number;
	private _bulletID: number;

	public Init(id: number) {
		this._id = id;
		this.LoadDef();
	}

	private LoadDef(): void {
		this._def = Defs.GetSkill(this._id);
		this._connectState = Hashtable.GetNumber(this._def, "connect_state");
		this._emitterID = Hashtable.GetNumber(this._def, "emitter");
		this._bulletID = Hashtable.GetNumber(this._def, "bullet");
	}
}