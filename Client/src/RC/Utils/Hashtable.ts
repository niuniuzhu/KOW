import { Vec2 } from "../Math/Vec2";
import { Vec3 } from "../Math/Vec3";
import { Vec4 } from "../Math/Vec4";

type pair = { [k: string]: any };

export class Hashtable {
	public static Concat(map: pair, map2: pair) {
		for (let k in map2) {
			if (map[k] == undefined) {
				map[k] = map2[k]
			}
		}
	}

	public static GetArray(map: pair, key: string): any[] {
		return <any[]>map[key];
	}

	public static GetMap(map: pair, key: string): pair {
		return map[key];
	}

	public static GetString(map: pair, key: string, v: string = ""): string {
		let result = <string>map[key];
		if (result == null || result == undefined)
			result = v;
		return result;
	}

	public static GetNumber(map: pair, key: string, v: number = 0): number {
		let result = <number>map[key];
		if (result == null || result == undefined)
			result = v;
		return result;
	}

	public static GetBool(map: pair, key: string, v: boolean = false): boolean {
		let result = <boolean>map[key];
		if (result == null || result == undefined)
			result = v;
		return result;
	}

	public static GetStringArray(map: pair, key: string): string[] {
		return <string[]>this.GetArray(map, key);
	}

	public static GetNumberArray(map: pair, key: string): number[] {
		return <number[]>this.GetArray(map, key);
	}

	public static GetBoolArray(map: pair, key: string): boolean[] {
		return this.GetArray(map, key) as boolean[];
	}

	public static GetMapArray(map: pair, key: string): pair[] {
		return <pair[]>this.GetArray(map, key);
	}

	public static GetVec2Array(map: pair, key: string): Vec2[] | null {
		let arrs: number[][] = this.GetArray(map, key);
		if (arrs == null)
			return null;
		let result: Vec2[] = [];
		for (let arr of arrs) {
			result.push(new Vec2(arr[0], arr[1]));
		}
		return result;
	}

	public static GetVec3Array(map: pair, key: string): Vec3[] | null {
		let arrs: number[][] = this.GetArray(map, key);
		if (arrs == null)
			return null;
		let result: Vec3[] = [];
		for (let arr of arrs) {
			result.push(new Vec3(arr[0], arr[1], arr[2]));
		}
		return result;
	}

	public static GetVec4Array(map: pair, key: string): Vec4[] | null {
		let arrs: number[][] = this.GetArray(map, key);
		if (arrs == null)
			return null;
		let result: Vec4[] = [];
		for (let arr of arrs) {
			result.push(new Vec4(arr[0], arr[1], arr[2], arr[3]));
		}
		return result;
	}

	public static GetVec2(map: pair, key: string): Vec2 | null {
		let arr: any[] = this.GetArray(map, key);
		if (arr == null)
			return null;
		return new Vec2(arr[0], arr[1]);
	}

	public static GetVec3(map: pair, key: string): Vec3 | null {
		let arr: any[] = this.GetArray(map, key);
		if (arr == null)
			return null;
		return new Vec3(arr[0], arr[1], arr[2]);
	}

	public static GetVec4(map: pair, key: string): Vec4 | null {
		let arr: any[] = this.GetArray(map, key);
		if (arr == null)
			return null;
		return new Vec4(arr[0], arr[1], arr[2], arr[3]);
	}
}