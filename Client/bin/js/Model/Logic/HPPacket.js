define(["require", "exports", "../../RC/Utils/Hashtable"], function (require, exports, Hashtable_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HPPacket {
        constructor(battle) {
            this._battle = battle;
        }
        Init(defs) {
            this._maxHpPacket = Hashtable_1.Hashtable.GetNumber(defs, "max_hp_packet");
            this._hpPacketRefreshInerval = Hashtable_1.Hashtable.GetNumber(defs, "hp_packet_refresh_interval");
            this._time = 0;
        }
        Update(dt) {
            while (this._time >= this._hpPacketRefreshInerval) {
                this._time -= this._hpPacketRefreshInerval;
                const item = this._battle.CreateSceneItem(0);
                const rndx = this._battle.random.NextFloor(this._battle.bounds.xMin + item.radius, this._battle.bounds.xMax - item.radius);
                const rndy = this._battle.random.NextFloor(this._battle.bounds.yMin + item.radius, this._battle.bounds.yMax - item.radius);
                item.position.Set(rndx, rndy);
            }
            this._time += dt;
        }
    }
    exports.HPPacket = HPPacket;
});
//# sourceMappingURL=HPPacket.js.map