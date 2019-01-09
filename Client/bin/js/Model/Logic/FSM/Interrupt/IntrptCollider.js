define(["require", "exports", "../../../../RC/Utils/Hashtable", "./IntrptBase"], function (require, exports, Hashtable_1, IntrptBase_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var IntrptColliderTargetType;
    (function (IntrptColliderTargetType) {
        IntrptColliderTargetType[IntrptColliderTargetType["Opponent"] = 0] = "Opponent";
        IntrptColliderTargetType[IntrptColliderTargetType["Teamate"] = 1] = "Teamate";
        IntrptColliderTargetType[IntrptColliderTargetType["Bullet"] = 2] = "Bullet";
    })(IntrptColliderTargetType || (IntrptColliderTargetType = {}));
    class IntrptCollider extends IntrptBase_1.IntrptBase {
        OnInit(def) {
            super.OnInit(def);
            this._targetType = Hashtable_1.Hashtable.GetNumber(def, "target_type");
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
    exports.IntrptCollider = IntrptCollider;
});
//# sourceMappingURL=IntrptCollider.js.map