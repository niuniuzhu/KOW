define(["require", "exports", "../../RC/FMath/Intersection", "../../RC/Utils/Hashtable", "../BattleEvent/SyncEvent", "../Defs", "../EntityType", "./Entity"], function (require, exports, Intersection_1, Hashtable_1, SyncEvent_1, Defs_1, EntityType_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SceneItemAttrOp;
    (function (SceneItemAttrOp) {
        SceneItemAttrOp[SceneItemAttrOp["Add"] = 0] = "Add";
        SceneItemAttrOp[SceneItemAttrOp["Mul"] = 1] = "Mul";
        SceneItemAttrOp[SceneItemAttrOp["Pow"] = 2] = "Pow";
        SceneItemAttrOp[SceneItemAttrOp["Sin"] = 3] = "Sin";
        SceneItemAttrOp[SceneItemAttrOp["Cos"] = 4] = "Cos";
    })(SceneItemAttrOp = exports.SceneItemAttrOp || (exports.SceneItemAttrOp = {}));
    class SceneItem extends Entity_1.Entity {
        get type() { return EntityType_1.EntityType.SceneItem; }
        get radius() { return this._radius; }
        get attrs() { return this._attrs; }
        get values() { return this._values; }
        get ops() { return this._ops; }
        LoadDefs() {
            const defs = Defs_1.Defs.GetSceneItem(this._id);
            this._radius = Hashtable_1.Hashtable.GetNumber(defs, "radius");
            this._attrs = Hashtable_1.Hashtable.GetNumberArray(defs, "attrs");
            this._values = Hashtable_1.Hashtable.GetNumberArray(defs, "values");
            this._ops = Hashtable_1.Hashtable.GetNumberArray(defs, "ops");
        }
        EncodeSnapshot(writer) {
            super.EncodeSnapshot(writer);
        }
        DecodeSnapshot(reader) {
            super.DecodeSnapshot(reader);
        }
        EncodeSync(writer) {
            super.EncodeSync(writer);
        }
        Intersect() {
            const champions = this._battle.GetChampions();
            let hit = false;
            for (const target of champions) {
                if (target.isDead)
                    continue;
                const intersectType = Intersection_1.Intersection.IntersectsCC(this.position, this._radius, target.position, target.radius);
                if (intersectType == Intersection_1.IntersectionType.Cling || intersectType == Intersection_1.IntersectionType.Inside) {
                    if (!target.battle.chase) {
                        SyncEvent_1.SyncEvent.ScenItemCollision(this.rid, target.rid);
                    }
                    this._battle.calcManager.AddItemUnit(this.rid, target.rid);
                    hit = true;
                }
                if (hit) {
                    break;
                }
            }
            if (hit) {
                this._markToDestroy = true;
            }
        }
    }
    exports.SceneItem = SceneItem;
});
//# sourceMappingURL=SceneItem.js.map