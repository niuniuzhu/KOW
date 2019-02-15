import * as Long from "../../Libs/long";
export class Team {
    constructor(battle) {
        this._champions = [];
        this.gladiatorTime = -1;
        this._battle = battle;
    }
    get numChanpions() { return this._champions.length; }
    Destroy() {
        this._champions.splice(0);
    }
    UpdateGladiator(dt) {
        this.gladiatorTime += dt;
        if (this.gladiatorTime > this._battle.gladiatorTimeout)
            this.gladiatorTime = this._battle.gladiatorTimeout;
    }
    AddChampion(champion) {
        for (const c of this._champions) {
            if (c.equals(champion.rid))
                return;
        }
        this._champions.push(Long.fromValue(champion.rid));
    }
    RemoveChampion(champion) {
        const count = this._champions.length;
        for (let i = 0; i < count; ++i) {
            if (this._champions[i].equals(champion.rid)) {
                this._champions.splice(i, 1);
                return;
            }
        }
    }
    RemoveChampionAt(index) {
        this._champions.splice(index, 1);
    }
    GetChampionAt(index) {
        return this._battle.GetChampion(this._champions[index]);
    }
    EncodeSnapshot(writer) {
        writer.int32(this.id);
        writer.int32(this.gladiatorTime);
        const count = this._champions.length;
        writer.int32(count);
        for (let i = 0; i < count; ++i) {
            writer.uint64(this._champions[i]);
        }
    }
    DecodeSnapshot(reader) {
        this.id = reader.int32();
        this.gladiatorTime = reader.int32();
        const count = reader.int32();
        for (let i = 0; i < count; ++i) {
            this._champions[i] = reader.uint64();
        }
    }
    EncodeSync(writer) {
        writer.int32(this.id);
        writer.int32(this.gladiatorTime);
    }
    Dump() {
        let str = "";
        str += `numChanpions:${this.numChanpions}\n`;
        str += `gladiatorTime:${this.gladiatorTime}\n`;
        return str;
    }
}
