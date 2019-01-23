define(["require", "exports", "../../../RC/FMath/FVec2", "../../../RC/Math/MathUtils", "../../../RC/Utils/Hashtable", "./EntityAction"], function (require, exports, FVec2_1, MathUtils_1, Hashtable_1, EntityAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActVelocity extends EntityAction_1.EntityAction {
        OnInit(def) {
            super.OnInit(def);
            this._speed = Hashtable_1.Hashtable.GetVec2(def, "speed");
        }
        OnExit() {
            super.OnExit();
            this.owner.phyxSpeed.Set(0, 0);
        }
        OnUpdate(dt) {
            let rot = MathUtils_1.MathUtils.Acos(this.owner.direction.Dot(FVec2_1.FVec2.up));
            if (this.owner.direction.x > 0) {
                rot = -rot;
            }
            const s = FVec2_1.FVec2.Rotate(this._speed, rot);
            this.owner.phyxSpeed.CopyFrom(s);
        }
    }
    exports.ActVelocity = ActVelocity;
});
//# sourceMappingURL=ActVelocity.js.map