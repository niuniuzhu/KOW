import { FVec2 } from "../../../RC/FMath/FVec2";
import { MathUtils } from "../../../RC/Math/MathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityStateAction } from "./EntityStateAction";
export class ActVelocity extends EntityStateAction {
    OnInit(def) {
        super.OnInit(def);
        this._speed = Hashtable.GetVec2(def, "speed");
    }
    OnExit() {
        super.OnExit();
        const owner = this.state.owner;
        owner.phyxSpeed.Set(0, 0);
    }
    OnUpdate(dt) {
        const owner = this.state.owner;
        let rot = MathUtils.Acos(owner.direction.Dot(FVec2.up));
        if (owner.direction.x > 0) {
            rot = -rot;
        }
        const s = FVec2.Rotate(this._speed, rot);
        owner.phyxSpeed.CopyFrom(s);
    }
    EncodeSnapshot(writer) {
    }
    DecodeSnapshot(reader) {
    }
}
