"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FVec2_1 = require("../../../RC/FMath/FVec2");
const MathUtils_1 = require("../../../RC/Math/MathUtils");
const Hashtable_1 = require("../../../RC/Utils/Hashtable");
const EntityStateAction_1 = require("./EntityStateAction");
class ActVelocity extends EntityStateAction_1.EntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._speed = Hashtable_1.Hashtable.GetVec2(def, "speed");
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
