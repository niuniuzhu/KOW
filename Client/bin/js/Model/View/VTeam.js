define(["require", "exports", "../../Model/BattleEvent/UIEvent"], function (require, exports, UIEvent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VTeam {
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
            UIEvent_1.UIEvent.GladiatorTimeChange(this.id, value);
        }
    }
    exports.VTeam = VTeam;
});
//# sourceMappingURL=VTeam.js.map