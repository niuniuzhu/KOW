import { Hashtable } from "../../../RC/Utils/Hashtable";
import { ActIntrptBase } from "./ActIntrptBase";
export class ActIntrptTimeup extends ActIntrptBase {
    OnInit(def) {
        super.OnInit(def);
        this.duration = Hashtable.GetNumber(def, "duration", -1);
    }
    OnUpdate(dt) {
        super.OnUpdate(dt);
        if (this.duration >= 0 &&
            this.time >= this.duration &&
            this.CheckFilter()) {
            this.ChangeState();
        }
    }
    EncodeSnapshot(writer) {
        super.EncodeSnapshot(writer);
        writer.int32(this.duration);
    }
    DecodeSnapshot(reader) {
        super.DecodeSnapshot(reader);
        this.duration = reader.int32();
    }
}
