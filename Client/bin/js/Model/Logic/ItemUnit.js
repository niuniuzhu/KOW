define(["require", "exports", "../../RC/FMath/FMathUtils", "../BattleEvent/SyncEvent", "./SceneItem"], function (require, exports, FMathUtils_1, SyncEvent_1, SceneItem_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ItemUnit {
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
                    case SceneItem_1.SceneItemAttrOp.Add:
                        _new = FMathUtils_1.FMathUtils.Add(value, old);
                        break;
                    case SceneItem_1.SceneItemAttrOp.Mul:
                        _new = FMathUtils_1.FMathUtils.Mul(value, old);
                        break;
                    case SceneItem_1.SceneItemAttrOp.Pow:
                        _new = FMathUtils_1.FMathUtils.Pow(value, old);
                        break;
                    case SceneItem_1.SceneItemAttrOp.Sin:
                        _new = FMathUtils_1.FMathUtils.Sin(old);
                        break;
                    case SceneItem_1.SceneItemAttrOp.Cos:
                        _new = FMathUtils_1.FMathUtils.Cos(old);
                        break;
                }
                _new = target.SetAttr(attr, _new);
                if (!item.battle.chase) {
                    SyncEvent_1.SyncEvent.Hit(this._targetID, this._targetID, _new - old);
                }
            }
            if (!item.battle.chase) {
                SyncEvent_1.SyncEvent.ItemTrigger(this._itemID, this._targetID);
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
    exports.ItemUnit = ItemUnit;
});
//# sourceMappingURL=ItemUnit.js.map