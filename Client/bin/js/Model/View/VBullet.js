define(["require", "exports", "../../RC/Utils/Hashtable", "../CDefs", "../EntityType", "./VEntity"], function (require, exports, Hashtable_1, CDefs_1, EntityType_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FxAttachType;
    (function (FxAttachType) {
        FxAttachType[FxAttachType["None"] = 0] = "None";
        FxAttachType[FxAttachType["Bullet"] = 1] = "Bullet";
        FxAttachType[FxAttachType["Target"] = 2] = "Target";
    })(FxAttachType || (FxAttachType = {}));
    var FxDestroyType;
    (function (FxDestroyType) {
        FxDestroyType[FxDestroyType["Effect"] = 0] = "Effect";
        FxDestroyType[FxDestroyType["Bullet"] = 1] = "Bullet";
        FxDestroyType[FxDestroyType["Target"] = 2] = "Target";
    })(FxDestroyType || (FxDestroyType = {}));
    class VBullet extends VEntity_1.VEntity {
        BeforeLoadDefs() {
            return CDefs_1.CDefs.GetBullet(this._id);
        }
        AfterLoadDefs(cdefs) {
            this._hitFxID = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_effect");
            this._hitFxDelay = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_fx_delay");
            this._hitFxOffset = Hashtable_1.Hashtable.GetVec2(cdefs, "offset");
            this._hitFxAttachType = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_fx_attach_type");
            this._hitFxDestroyType = Hashtable_1.Hashtable.GetNumber(cdefs, "hit_fx_destroy_type");
            this._hitFxFollowPos = Hashtable_1.Hashtable.GetBool(cdefs, "hit_fx_follow_pos");
            this._hitFxFollowRot = Hashtable_1.Hashtable.GetBool(cdefs, "hit_fx_follow_rot");
            this._hitFxAlwaysFollow = Hashtable_1.Hashtable.GetBool(cdefs, "hit_fx_always_follow");
            this.DisplayRoot();
        }
        Destroy() {
            if (this._fx != null) {
                if (this._hitFxDestroyType == FxDestroyType.Bullet) {
                    this._fx.markToDestroy = true;
                }
                this._fx = null;
            }
            this._caster = null;
            this._target = null;
            super.Destroy();
        }
        OnCollision(caster, target) {
            this._time = 0;
            this._triggered = false;
            this._caster = caster;
            this._target = target;
            if (this._hitFxDelay == 0) {
                this.Trigger();
            }
        }
        Update(dt) {
            super.Update(dt);
            if (!this._triggered) {
                if (this._time >= this._hitFxDelay) {
                    this.Trigger();
                }
                this._time += dt;
            }
        }
        Trigger() {
            this._triggered = true;
            this._fx = this._battle.SpawnEffect(this._hitFxID);
            if (this._hitFxDestroyType != FxDestroyType.Effect &&
                this._fx.lifeTime >= 0) {
                throw new Error(`fx:${this._fx.id}'s lifetime greater then zero, can only set destroy type to FxDestroyType.Effect`);
            }
            switch (this._hitFxAttachType) {
                case FxAttachType.Bullet:
                    this._fx.SetTarget(EntityType_1.EntityType.Bullet, this.rid, this._hitFxOffset, this._hitFxFollowPos, this._hitFxFollowRot, this._hitFxAlwaysFollow);
                    break;
                case FxAttachType.Target:
                    this._fx.SetTarget(EntityType_1.EntityType.Champion, this._target.rid, this._hitFxOffset, this._hitFxFollowPos, this._hitFxFollowRot, this._hitFxAlwaysFollow);
                    break;
            }
        }
    }
    exports.VBullet = VBullet;
});
//# sourceMappingURL=VBullet.js.map