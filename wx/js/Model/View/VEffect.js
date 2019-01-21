"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec2_1 = require("../../RC/Math/Vec2");
const Hashtable_1 = require("../../RC/Utils/Hashtable");
const CDefs_1 = require("../CDefs");
const EntityType_1 = require("../EntityType");
const VEntity_1 = require("./VEntity");
const Logger_1 = require("../../RC/Utils/Logger");
class VEffect extends VEntity_1.VEntity {
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
        return CDefs_1.CDefs.GetEffect(this._id);
    }
    AfterLoadDefs(cdefs) {
        this._animationID = Hashtable_1.Hashtable.GetNumber(cdefs, "animation");
        this._lifeTime = Hashtable_1.Hashtable.GetNumber(cdefs, "lifetime");
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
                case EntityType_1.EntityType.Bullet:
                    target = this.battle.GetBullet(this._followTarget);
                    break;
                case EntityType_1.EntityType.Champion:
                    target = this.battle.GetChampion(this._followTarget);
                    break;
                default:
                    Logger_1.Logger.Error(`follow type:${this._followType} not supported`);
                    break;
            }
            if (target != null) {
                if (this._followPos) {
                    const offset = Vec2_1.Vec2.Rotate(this._followOffset, target.rotation);
                    this.position = Vec2_1.Vec2.Add(target.position, offset);
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
exports.VEffect = VEffect;
