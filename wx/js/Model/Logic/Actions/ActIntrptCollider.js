import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ActIntrptBase } from "./ActIntrptBase";
var IntrptColliderTargetType;
(function (IntrptColliderTargetType) {
    IntrptColliderTargetType[IntrptColliderTargetType["Opponent"] = 0] = "Opponent";
    IntrptColliderTargetType[IntrptColliderTargetType["Teamate"] = 1] = "Teamate";
    IntrptColliderTargetType[IntrptColliderTargetType["Bullet"] = 2] = "Bullet";
})(IntrptColliderTargetType || (IntrptColliderTargetType = {}));
export class ActIntrptCollider extends ActIntrptBase {
    OnInit(def) {
        super.OnInit(def);
        this._targetType = Hashtable.GetNumber(def, "target_type");
    }
    OnUpdatePhysic(dt) {
        super.OnUpdatePhysic(dt);
        if (this.owner.intersectionCache.length == 0) {
            return;
        }
        switch (this._targetType) {
            case IntrptColliderTargetType.Opponent: {
                for (const intersestion of this.owner.intersectionCache) {
                    const target = this.owner.battle.GetChampion(intersestion.rid);
                    if (target.team != this.owner.team) {
                        this.DoCollision();
                        return;
                    }
                }
                break;
            }
            case IntrptColliderTargetType.Teamate: {
                for (const intersestion of this.owner.intersectionCache) {
                    const target = this.owner.battle.GetChampion(intersestion.rid);
                    if (target.team == this.owner.team) {
                        this.DoCollision();
                        return;
                    }
                }
                break;
            }
            case IntrptColliderTargetType.Bullet: {
                break;
            }
        }
    }
    DoCollision() {
        if (this.CheckFilter()) {
            this.ChangeState();
        }
    }
}
