"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HitUnit_1 = require("./HitUnit");
const ItemUnit_1 = require("./ItemUnit");
class CalcationManager {
    constructor(battle) {
        this._itemUnits = [];
        this._hitUnits = [];
        this._battle = battle;
    }
    get battle() { return this._battle; }
    Destroy() {
        this._itemUnits.splice(0);
        this._hitUnits.splice(0);
    }
    AddItemUnit(itemID, targetID) {
        const itemUnit = new ItemUnit_1.ItemUnit(this);
        itemUnit.Init(itemID, targetID);
        this._itemUnits.push(itemUnit);
    }
    AddHitUnit(casterID, targetID, skillID) {
        const hitUnit = new HitUnit_1.HitUnit(this);
        hitUnit.Init(casterID, targetID, skillID);
        this._hitUnits.push(hitUnit);
    }
    Update() {
        for (const itemUnit of this._itemUnits) {
            itemUnit.Calculate();
        }
        this._itemUnits.splice(0);
        for (const hitUnit of this._hitUnits) {
            hitUnit.Calculate();
        }
        this._hitUnits.splice(0);
    }
    EncodeSnapshot(writer) {
        let count = this._itemUnits.length;
        writer.int32(count);
        for (let i = 0; i < count; ++i) {
            this._itemUnits[i].EncodeSnapshot(writer);
        }
        count = this._hitUnits.length;
        writer.int32(count);
        for (let i = 0; i < count; ++i) {
            this._hitUnits[i].EncodeSnapshot(writer);
        }
    }
    DecodeSnapshot(reader) {
        let count = reader.int32();
        for (let i = 0; i < count; ++i) {
            const itemUnit = new ItemUnit_1.ItemUnit(this);
            itemUnit.DecodeSnapshot(reader);
            this._itemUnits.push(itemUnit);
        }
        count = reader.int32();
        for (let i = 0; i < count; ++i) {
            const hitUnit = new HitUnit_1.HitUnit(this);
            hitUnit.DecodeSnapshot(reader);
            this._hitUnits.push(hitUnit);
        }
    }
}
exports.CalcationManager = CalcationManager;
