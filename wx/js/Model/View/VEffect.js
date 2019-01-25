import { Vec2 } from "../../RC/Math/Vec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { EntityType } from "../EntityType";
import { VEntity } from "./VEntity";
import { Logger } from "../../RC/Utils/Logger";
export class VEffect extends VEntity {
    constructor(battle, id) {
        super(battle);
        this._followPos = false;
        this._followRot = false;
        this._alwaysFollow = false;
        this._id = id;
        this.LoadDefs();
    }
    get casterID() { return this._casterID; }
    get targetID() { return this._targetID; }
    get followType() { return this._followType; }
    get followOffset() { return this.followOffset; }
    get followPos() { return this._followPos; }
    get followRot() { return this._followRot; }
    get alwaysFollow() { return this._alwaysFollow; }
    get animationID() { return this._animationID; }
    get lifeTime() { return this._lifeTime; }
    get time() { return this._time; }
    LoadCDef() {
        return CDefs.GetEffect(this._id);
    }
    AfterLoadCDef(cdefs) {
        this._animationID = Hashtable.GetNumber(cdefs, "animation");
        this._lifeTime = Hashtable.GetNumber(cdefs, "lifetime");
        if (this._lifeTime == 0) {
            const setting = this._animationProxy.GetSetting(this._animationID);
            this._lifeTime = setting.length * setting.interval;
        }
    }
    Set(casterID, targetID, followType, followOffset, followPos, followRot, alwaysFollow) {
        this._casterID = casterID;
        this._targetID = targetID;
        this._followType = followType;
        this._followOffset = followOffset;
        this._followPos = followPos;
        this._followRot = followRot;
        this._alwaysFollow = alwaysFollow;
        this.UpdateFollow();
    }
    Update(dt) {
        if (this._lifeTime >= 0 && this._time >= this._lifeTime) {
            this.markToDestroy = true;
        }
        if (!this.markToDestroy) {
            this._time += dt;
        }
        if (this._alwaysFollow)
            this.UpdateFollow();
    }
    UpdateFollow() {
        if (this._targetID != null) {
            let target;
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
    OnSpawn() {
        this._time = 0;
        this.markToDestroy = false;
        this.DisplayRoot();
        this._animationProxy.Play(this._animationID, 0, 1, true);
    }
    OnDespawn() {
        this._followOffset = null;
        this._targetID = null;
        this._root.removeFromParent();
    }
}
