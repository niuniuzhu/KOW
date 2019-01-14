define(["require", "exports", "../../RC/Utils/Hashtable", "../../RC/FMath/FVec2"], function (require, exports, Hashtable_1, FVec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HPPacket {
        constructor(battle) {
            this._battle = battle;
        }
        Init(defs) {
            this._max = Hashtable_1.Hashtable.GetNumber(defs, "max_hp_packet");
            this._refreshInterval = Hashtable_1.Hashtable.GetNumber(defs, "hp_packet_refresh_interval");
            this._padding = Hashtable_1.Hashtable.GetNumber(defs, "hp_packet_padding");
            this._time = 0;
        }
        Update(dt) {
            while (this._time >= this._refreshInterval) {
                this._time -= this._refreshInterval;
                const rndx = this._battle.random.NextD(this._battle.bounds.xMin + this._padding, this._battle.bounds.xMax - this._padding);
                const rndy = this._battle.random.NextD(this._battle.bounds.yMin + this._padding, this._battle.bounds.yMax - this._padding);
                const item = this._battle.CreateSceneItem(0, new FVec2_1.FVec2(rndx, rndy));
            }
            if (this._battle.GetSceneItems().length < this._max) {
                this._time += dt;
            }
        }
    }
    exports.HPPacket = HPPacket;
});
//# sourceMappingURL=HPPacket.js.map