define(["require", "exports", "../Math/Vec2", "../Math/Vec3", "../Math/Vec4"], function (require, exports, Vec2_1, Vec3_1, Vec4_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Hashtable {
        static Concat(map, map2) {
            for (let k in map2) {
                if (map[k] == undefined) {
                    map[k] = map2[k];
                }
            }
        }
        static GetArray(map, key) {
            return map[key];
        }
        static GetMap(map, key) {
            return map[key];
        }
        static GetString(map, key) {
            return map[key];
        }
        static GetNumber(map, key) {
            return map[key];
        }
        static GetBool(map, key) {
            return map[key];
        }
        static GetStringArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetNumberArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetBoolArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetMapArray(map, key) {
            return this.GetArray(map, key);
        }
        static GetVec2Array(map, key) {
            let arrs = this.GetArray(map, key);
            if (arrs == null)
                return null;
            let result = [];
            for (let arr of arrs) {
                result.push(new Vec2_1.Vec2(arr[0], arr[1]));
            }
            return result;
        }
        static GetVec3Array(map, key) {
            let arrs = this.GetArray(map, key);
            if (arrs == null)
                return null;
            let result = [];
            for (let arr of arrs) {
                result.push(new Vec3_1.Vec3(arr[0], arr[1], arr[2]));
            }
            return result;
        }
        static GetVec4Array(map, key) {
            let arrs = this.GetArray(map, key);
            if (arrs == null)
                return null;
            let result = [];
            for (let arr of arrs) {
                result.push(new Vec4_1.Vec4(arr[0], arr[1], arr[2], arr[3]));
            }
            return result;
        }
        static GetVec2(map, key) {
            let arr = this.GetArray(map, key);
            if (arr == null)
                return null;
            return new Vec2_1.Vec2(arr[0], arr[1]);
        }
        static GetVec3(map, key) {
            let arr = this.GetArray(map, key);
            if (arr == null)
                return null;
            return new Vec3_1.Vec3(arr[0], arr[1], arr[2]);
        }
        static GetVec4(map, key) {
            let arr = this.GetArray(map, key);
            if (arr == null)
                return null;
            return new Vec4_1.Vec4(arr[0], arr[1], arr[2], arr[3]);
        }
    }
    exports.Hashtable = Hashtable;
});
//# sourceMappingURL=Hashtable.js.map