import { FVec2 } from "../../../RC/FMath/FVec2";
import { MathUtils } from "../../../RC/Math/MathUtils";
import { Hashtable } from "../../../RC/Utils/Hashtable";
import { EntityAction } from "./EntityAction";
export class ActVelocity extends EntityAction {
    OnInit(def) {
        super.OnInit(def);
        this._speed = Hashtable.GetVec2(def, "speed");
    }
    OnExit() {
        super.OnExit();
        this.owner.phyxSpeed.Set(0, 0);
    }
    OnUpdate(dt) {
        let rot = MathUtils.Acos(this.owner.direction.Dot(FVec2.up));
        if (this.owner.direction.x > 0) {
            rot = -rot;
        }
        const s = FVec2.Rotate(this._speed, rot);
        this.owner.phyxSpeed.CopyFrom(s);
    }
}
