define(["require", "exports", "./EntityStateAction", "../../RC/FMath/FVec2", "../../RC/Math/MathUtils", "../../RC/Utils/Hashtable"], function (require, exports, EntityStateAction_1, FVec2_1, MathUtils_1, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ActVelocity extends EntityStateAction_1.EntityStateAction {
        OnInit(def) {
            super.OnInit(def);
            this._speed = Hashtable_1.Hashtable.GetVec2(this._def, "speed");
        }
        OnExit() {
            super.OnExit();
            const owner = this.state.owner;
            owner.phyxSpeed.Set(0, 0);
        }
        OnUpdate(dt) {
            const owner = this.state.owner;
            let rot = MathUtils_1.MathUtils.Acos(owner.direction.Dot(FVec2_1.FVec2.up));
            if (owner.direction.x > 0) {
                rot = -rot;
            }
            const s = FVec2_1.FVec2.Rotate(this._speed, rot);
            owner.phyxSpeed.CopyFrom(s);
        }
        EncodeSnapshot(writer) {
        }
        DecodeSnapshot(reader) {
        }
    }
    exports.ActVelocity = ActVelocity;
});
//# sourceMappingURL=ActVelocity.js.map