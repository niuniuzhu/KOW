import { UIEvent } from "../../Model/BattleEvent/UIEvent";
export class VTeam {
    get id() { return this._id; }
    get gladiatorTime() { return this._gladiatorTime; }
    set gladiatorTime(value) {
        if (value == this._gladiatorTime)
            return;
        this._gladiatorTime = value;
        this.OnGladiatorTimeChanged(value);
    }
    DecodeSync(id, reader) {
        this._id = id;
        this.gladiatorTime = reader.int32();
    }
    OnGladiatorTimeChanged(value) {
        UIEvent.GladiatorTimeChange(this.id, value);
    }
}
