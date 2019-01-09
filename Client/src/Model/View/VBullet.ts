import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";
import { VChampion } from "./VChampion";
import { Hashtable } from "../../RC/Utils/Hashtable";

export enum FxFollowType {
	None,
	Bullet,
	Target
}

export enum FxDestroyType {
	Effect,
	Bullet,
	Target
}

export class VBullet extends VEntity {
	private _hitFxID: number;
	private _hitFxDelay: number;
	private _hitFxFollowType: FxFollowType;
	private _hitFxDestroyType: FxDestroyType;

	private _hitTime: number;
	private _target: VChampion;

	protected LoadDefs(): void {
		const cdefs = CDefs.GetBullet(this._id);
		this._hitFxID = Hashtable.GetNumber(cdefs, "hit_effect");
		this._hitFxDelay = Hashtable.GetNumber(cdefs, "hit_fx_delay");
		this._hitFxFollowType = Hashtable.GetNumber(cdefs, "hit_fx_follow_type");
		this._hitFxDestroyType = Hashtable.GetNumber(cdefs, "hit_fx_destroy_type");
	}

	public OnHit(target: VChampion): void {
		this._target = target;
	}
}