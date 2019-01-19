import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VBattle } from "./VBattle";
import { VEntity } from "./VEntity";

export class VEffect extends VEntity {
	public get lifeTime(): number { return this._lifeTime; }

	private _animationID: number;
	private _lifeTime: number;
	private _time: number;

	constructor(battle: VBattle, id: number) {
		super(battle);
		this._id = id;
		this.LoadDefs();
	}

	protected BeforeLoadDefs(): Hashtable {
		return CDefs.GetEffect(this._id);
	}

	protected AfterLoadDefs(cdefs: Hashtable): void {
		this._animationID = Hashtable.GetNumber(cdefs, "animation");
		this._lifeTime = Hashtable.GetNumber(cdefs, "lifetime");
		if (this._lifeTime == 0) {
			const setting = this._animationProxy.GetSetting(this._animationID);
			this._lifeTime = setting.length * setting.interval;
		}
	}

	public Update(dt: number): void {
		if (this._lifeTime >= 0 && this._time >= this._lifeTime) {
			this.markToDestroy = true;
		}
		if (!this.markToDestroy) {
			this._time += dt;
		}
	}

	public OnSpawn(): void {
		this._time = 0;
		this.markToDestroy = false;
		this.DisplayRoot();
		this._animationProxy.Play(this._animationID, 0, 1, true);
	}

	public OnDespawn(): void {
		this._root.removeFromParent();
	}
}