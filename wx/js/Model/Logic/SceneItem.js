import { Intersection, IntersectionType } from "../../RC/FMath/Intersection";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { Defs } from "../Defs";
import { EntityType } from "../EntityType";
import { Entity } from "./Entity";
export var SceneItemAttrOp;
(function (SceneItemAttrOp) {
    SceneItemAttrOp[SceneItemAttrOp["Add"] = 0] = "Add";
    SceneItemAttrOp[SceneItemAttrOp["Mul"] = 1] = "Mul";
    SceneItemAttrOp[SceneItemAttrOp["Pow"] = 2] = "Pow";
    SceneItemAttrOp[SceneItemAttrOp["Sin"] = 3] = "Sin";
    SceneItemAttrOp[SceneItemAttrOp["Cos"] = 4] = "Cos";
})(SceneItemAttrOp || (SceneItemAttrOp = {}));
export class SceneItem extends Entity {
    get type() { return EntityType.SceneItem; }
    get radius() { return this._radius; }
    get attrs() { return this._attrs; }
    get values() { return this._values; }
    get ops() { return this._ops; }
    LoadDefs() {
        const defs = Defs.GetSceneItem(this._id);
        this._radius = Hashtable.GetNumber(defs, "radius");
        this._attrs = Hashtable.GetNumberArray(defs, "attrs");
        this._values = Hashtable.GetNumberArray(defs, "values");
        this._ops = Hashtable.GetNumberArray(defs, "ops");
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
            const intersectType = Intersection.IntersectsCC(this.position, this._radius, target.position, target.radius);
            if (intersectType == IntersectionType.Cling || intersectType == IntersectionType.Inside) {
                if (!target.battle.chase) {
                    SyncEvent.ScenItemCollision(this.rid, target.rid);
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
