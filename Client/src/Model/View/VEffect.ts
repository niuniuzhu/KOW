import * as Long from "../../Libs/long";
import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { EntityType } from "../EntityType";
import { VBattle } from "./VBattle";
import { VEntity } from "./VEntity";
import { Logger } from "../../RC/Utils/Logger";

export class VEffect extends VEntity {
	public get casterID(): Long { return this._casterID; }
	public get targetID(): Long { return this._targetID; }
	public get followType(): EntityType { return this._followType; }
	public get followOffset(): Vec2 { return this.followOffset; }
	public get followPos(): boolean { return this._followPos; }
	public get followRot(): boolean { return this._followRot; }
	public get alwaysFollow(): boolean { return this._alwaysFollow; }
	public get animationID(): number { return this._animationID; }
	public get lifeTime(): number { return this._lifeTime; }
	public get time(): number { return this._time; }

	private _animationID: number;
	private _lifeTime: number;
	private _time: number;

	private _casterID: Long;
	private _targetID: Long;
	private _followType: EntityType;
	private _followOffset: Vec2;
	private _followPos: boolean = false;
	private _followRot: boolean = false;
	private _alwaysFollow: boolean = false;

	constructor(battle: VBattle, id: number) {
		super(battle);
		this._id = id;
		this.LoadDefs();
	}

	protected LoadCDef(): Hashtable {
		return CDefs.GetEffect(this._id);
	}

	protected AfterLoadCDef(cdefs: Hashtable): void {
		this._animationID = Hashtable.GetNumber(cdefs, "animation");
		this._lifeTime = Hashtable.GetNumber(cdefs, "lifetime");
		if (this._lifeTime == 0) {
			const setting = this._animationProxy.GetSetting(this._animationID);
			this._lifeTime = setting.length * setting.interval;
		}
	}

	public Set(casterID: Long, targetID: Long,
		followType: EntityType, followOffset: Vec2, followPos: boolean,
		followRot: boolean, alwaysFollow: boolean): void {
		this._casterID = casterID;
		this._targetID = targetID;
		this._followType = followType;
		this._followOffset = followOffset;
		this._followPos = followPos;
		this._followRot = followRot;
		this._alwaysFollow = alwaysFollow;
		this.UpdateFollow();
	}

	public Update(dt: number): void {
		if (this._lifeTime >= 0 && this._time >= this._lifeTime) {
			this.markToDestroy = true;
		}
		if (!this.markToDestroy) {
			this._time += dt;
		}
		if (this._alwaysFollow)
			this.UpdateFollow();
	}

	private UpdateFollow(): void {
		if (this._targetID != null) {
			let target: VEntity;
			switch (this._followType) {
				case EntityType.Bullet:
					target = this.battle.GetBullet(this._targetID);
					break;
				case EntityType.Champion:
					target = this.battle.GetChampion(this._targetID);
					break;
				default:
					Logger.Error(`follow type:${this._followType} not supported`);
					break;
			}
			if (target != null) {
				if (this._followPos) {
					const offset = Vec2.Rotate(this._followOffset, target.rotation);
					this.position = Vec2.Add(target.position, offset);
				}
				if (this._followRot) {
					this.rotation = target.rotation;
				}
			}
		}
	}

	public OnSpawn(): void {
		this._time = 0;
		this.markToDestroy = false;
		this.DisplayRoot();
		this._animationProxy.Play(this._animationID, 0, 1, true);
	}

	public OnDespawn(): void {
		this._followOffset = null;
		this._targetID = null;
		this._root.removeFromParent();
	}
}