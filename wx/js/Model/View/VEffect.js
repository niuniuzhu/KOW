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
    get lifeTime() { return this._lifeTime; }
    BeforeLoadDefs() {
        return CDefs.GetEffect(this._id);
    }
    AfterLoadDefs(cdefs) {
        this._animationID = Hashtable.GetNumber(cdefs, "animation");
        this._lifeTime = Hashtable.GetNumber(cdefs, "lifetime");
        if (this._lifeTime == 0) {
            const setting = this._animationProxy.GetSetting(this._animationID);
            this._lifeTime = setting.length * setting.interval;
        }
    }
    SetTarget(followType, followTarget, followOffset, followPos, followRot, alwaysFollow) {
        this._followType = followType;
        this._followTarget = followTarget;
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
        if (this._followTarget != null) {
            let target;
            switch (this._followType) {
                case EntityType.Bullet:
                    target = this.battle.GetBullet(this._followTarget);
                    break;
                case EntityType.Champion:
                    target = this.battle.GetChampion(this._followTarget);
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
        this._followTarget = null;
        this._root.removeFromParent();
    }
}
