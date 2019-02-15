import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { SceneItemAttrOp } from "./SceneItem";
export class ItemUnit {
    constructor(manager) {
        this._manager = manager;
    }
    Init(itemID, targetID) {
        this._itemID = itemID;
        this._targetID = targetID;
    }
    Calculate() {
        const item = this._manager.battle.GetSceneItem(this._itemID);
        const target = this._manager.battle.GetChampion(this._targetID);
        const count = item.attrs.length;
        for (let i = 0; i < count; ++i) {
            const attr = item.attrs[i];
            const value = item.values[i];
            const op = item.ops[i];
            const old = target.GetAttr(attr);
            let _new;
            switch (op) {
                case SceneItemAttrOp.Add:
                    _new = FMathUtils.Add(value, old);
                    break;
                case SceneItemAttrOp.Mul:
                    _new = FMathUtils.Mul(value, old);
                    break;
                case SceneItemAttrOp.Pow:
                    _new = FMathUtils.Pow(value, old);
                    break;
                case SceneItemAttrOp.Sin:
                    _new = FMathUtils.Sin(old);
                    break;
                case SceneItemAttrOp.Cos:
                    _new = FMathUtils.Cos(old);
                    break;
            }
            _new = target.SetAttr(attr, _new);
            if (!item.battle.chase) {
                SyncEvent.Hit(this._targetID, this._targetID, _new - old);
            }
        }
        if (!item.battle.chase) {
            SyncEvent.ItemTrigger(this._itemID, this._targetID);
        }
    }
    EncodeSnapshot(writer) {
        writer.uint64(this._itemID);
        writer.uint64(this._targetID);
    }
    DecodeSnapshot(reader) {
        this._itemID = reader.uint64();
        this._targetID = reader.uint64();
    }
}
