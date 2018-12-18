import { Vec2 } from "../Math/Vec2";
import { Vec3 } from "../Math/Vec3";
import { Vec4 } from "../Math/Vec4";
export class Hashtable {
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
    static GetString(map, key, v = "") {
        let result = map[key];
        if (result == null || result == undefined)
            result = v;
        return result;
    }
    static GetNumber(map, key, v = 0) {
        let result = map[key];
        if (result == null || result == undefined)
            result = v;
        return result;
    }
    static GetBool(map, key, v = false) {
        let result = map[key];
        if (result == null || result == undefined)
            result = v;
        return result;
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
            result.push(new Vec2(arr[0], arr[1]));
        }
        return result;
    }
    static GetVec3Array(map, key) {
        let arrs = this.GetArray(map, key);
        if (arrs == null)
            return null;
        let result = [];
        for (let arr of arrs) {
            result.push(new Vec3(arr[0], arr[1], arr[2]));
        }
        return result;
    }
    static GetVec4Array(map, key) {
        let arrs = this.GetArray(map, key);
        if (arrs == null)
            return null;
        let result = [];
        for (let arr of arrs) {
            result.push(new Vec4(arr[0], arr[1], arr[2], arr[3]));
        }
        return result;
    }
    static GetVec2(map, key) {
        let arr = this.GetArray(map, key);
        if (arr == null)
            return null;
        return new Vec2(arr[0], arr[1]);
    }
    static GetVec3(map, key) {
        let arr = this.GetArray(map, key);
        if (arr == null)
            return null;
        return new Vec3(arr[0], arr[1], arr[2]);
    }
    static GetVec4(map, key) {
        let arr = this.GetArray(map, key);
        if (arr == null)
            return null;
        return new Vec4(arr[0], arr[1], arr[2], arr[3]);
    }
}
