define(["require", "exports", "../../RC/Utils/Hashtable", "../Defs", "./Entity"], function (require, exports, Hashtable_1, Defs_1, Entity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Op;
    (function (Op) {
        Op[Op["Add"] = 0] = "Add";
        Op[Op["Mul"] = 1] = "Mul";
        Op[Op["Pow"] = 2] = "Pow";
        Op[Op["Sin"] = 3] = "Sin";
        Op[Op["Cos"] = 4] = "Cos";
    })(Op || (Op = {}));
    class SceneItem extends Entity_1.Entity {
        get radius() { return this._radius; }
        Init(params) {
            super.Init(params);
            this.position.CopyFrom(params.position);
            this.direction.CopyFrom(params.direction);
        }
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
        }
    }
    exports.SceneItem = SceneItem;
});
//# sourceMappingURL=SceneItem.js.map