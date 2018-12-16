import { Defs } from "./Defs";
import { Hashtable } from "../RC/Utils/Hashtable";

export class Skill {
	public get id(): number { return this._id; }
	public get connectedState(): number { return Hashtable.GetNumber(this._def, "connected_state"); }

	private _id: number;
	private _def: Hashtable;

	public Init(id: number) {
		this._id = id;
		this.LoadDef();
	}

	private LoadDef(): void {
		this._def = Defs.GetSkill(this._id);
	}
}