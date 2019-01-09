import { Hashtable } from "../../../../RC/Utils/Hashtable";
import { IntrptBase } from "./IntrptBase";
var IntrptColliderTargetType;
(function (IntrptColliderTargetType) {
    IntrptColliderTargetType[IntrptColliderTargetType["Opponent"] = 0] = "Opponent";
    IntrptColliderTargetType[IntrptColliderTargetType["Teamate"] = 1] = "Teamate";
    IntrptColliderTargetType[IntrptColliderTargetType["Bullet"] = 2] = "Bullet";
})(IntrptColliderTargetType || (IntrptColliderTargetType = {}));
export class IntrptCollider extends IntrptBase {
    OnInit(def) {
        super.OnInit(def);
        this._targetType = Hashtable.GetNumber(def, "target_type");
    }
    OnUpdatePhysic(dt) {
        super.OnUpdatePhysic(dt);
        const owner = this._state.owner;
        if (owner.intersectionCache.length == 0) {
            return;
        }
        switch (this._targetType) {
            case IntrptColliderTargetType.Opponent: {
                for (const intersestion of owner.intersectionCache) {
                    const target = owner.battle.GetChampion(intersestion.rid);
                    if (target.team != owner.team) {
                        this.DoCollision();
                        return;
                    }
                }
                break;
            }
            case IntrptColliderTargetType.Teamate: {
                for (const intersestion of owner.intersectionCache) {
                    const target = owner.battle.GetChampion(intersestion.rid);
                    if (target.team == owner.team) {
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
        this.ChangeState();
    }
}
