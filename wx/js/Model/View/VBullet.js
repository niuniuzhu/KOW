import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";
var FxAttachType;
(function (FxAttachType) {
    FxAttachType[FxAttachType["None"] = 0] = "None";
    FxAttachType[FxAttachType["Bullet"] = 1] = "Bullet";
    FxAttachType[FxAttachType["Target"] = 2] = "Target";
})(FxAttachType || (FxAttachType = {}));
var PosRotType;
(function (PosRotType) {
    PosRotType[PosRotType["None"] = 0] = "None";
    PosRotType[PosRotType["Position"] = 1] = "Position";
    PosRotType[PosRotType["Rotation"] = 2] = "Rotation";
})(PosRotType || (PosRotType = {}));
var FxDestroyType;
(function (FxDestroyType) {
    FxDestroyType[FxDestroyType["Effect"] = 0] = "Effect";
    FxDestroyType[FxDestroyType["Bullet"] = 1] = "Bullet";
    FxDestroyType[FxDestroyType["Target"] = 2] = "Target";
})(FxDestroyType || (FxDestroyType = {}));
export class VBullet extends VEntity {
    BeforeLoadDefs() {
        return CDefs.GetBullet(this._id);
    }
    AfterLoadDefs(cdefs) {
        this._hitFxID = Hashtable.GetNumber(cdefs, "hit_effect");
        this._hitFxDelay = Hashtable.GetNumber(cdefs, "hit_fx_delay");
        this._hitFxAttachType = Hashtable.GetNumber(cdefs, "hit_fx_attach_type");
        this._posRotType = Hashtable.GetNumber(cdefs, "hit_fx_posrot_type");
        this._hitFxDestroyType = Hashtable.GetNumber(cdefs, "hit_fx_destroy_type");
        this._followPos = Hashtable.GetBool(cdefs, "hit_fx_follow_pos");
        this._followRot = Hashtable.GetBool(cdefs, "hit_fx_follow_rot");
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
        else {
            if (this._followPos) {
                switch (this._hitFxAttachType) {
                    case FxAttachType.Bullet:
                        this._fx.position = this.position;
                        break;
                    case FxAttachType.Target:
                        this._fx.position = this._target.position;
                        break;
                }
            }
            if (this._followRot) {
                switch (this._hitFxAttachType) {
                    case FxAttachType.Bullet:
                        this._fx.rotation = this.rotation;
                        break;
                    case FxAttachType.Target:
                        this._fx.rotation = this._target.rotation;
                        break;
                }
            }
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
                if ((this._posRotType & PosRotType.Position) > 0) {
                    this._fx.position = this.position;
                }
                if ((this._posRotType & PosRotType.Rotation) > 0) {
                    this._fx.rotation = this.rotation;
                }
                break;
            case FxAttachType.Target:
                if ((this._posRotType & PosRotType.Position) > 0) {
                    this._fx.position = this._target.position;
                }
                if ((this._posRotType & PosRotType.Rotation) > 0) {
                    this._fx.rotation = this._target.rotation;
                }
                break;
        }
    }
}
