import { Vec2 } from "../Math/Vec2";

import { Vec3 } from "../Math/Vec3";

import { Vec4 } from "../Math/Vec4";

export class Hashtable {
	public static Concat(map: { [k: string]: any }, map2: { [k: string]: any }) {
		for (let k in map2) {
			if (map[k] == undefined) {
				map[k] = map2[k]
			}
		}
	}

	public static GetArray(map: { [k: string]: any }, key: string): any[] {
		return <any[]>map[key];
	}

	public static GetMap(map: { [k: string]: any }, key: string): { [k: string]: any } {
		return map[key];
	}

	public static GetString(map: { [k: string]: any }, key: string): string {
		return <string>map[key];
	}

	public static GetNumber(map: { [k: string]: any }, key: string): number {
		return <number>map[key];
	}

	public static GetBool(map: { [k: string]: any }, key: string): boolean {
		return <boolean>map[key];
	}

	public static GetStringArray(map: { [k: string]: any }, key: string): string[] {
		return <string[]>this.GetArray(map, key);
	}

	public static GetNumberArray(map: { [k: string]: any }, key: string): number[] {
		return <number[]>this.GetArray(map, key);
	}

	public static GetBoolArray(map: { [k: string]: any }, key: string): boolean[] {
		return this.GetArray(map, key) as boolean[];
	}

	public static GetVec2Array(map: { [k: string]: any }, key: string): Vec2[] | null {
		let arrs: number[][] = this.GetArray(map, key);
		if (arrs == null)
			return null;
		let result: Vec2[] = [];
		for (let arr of arrs) {
			result.push(new Vec2(arr[0], arr[1]));
		}
		return result;
	}

	public static GetVec3Array(map: { [k: string]: any }, key: string): Vec3[] | null {
		let arrs: number[][] = this.GetArray(map, key);
		if (arrs == null)
			return null;
		let result: Vec3[] = [];
		for (let arr of arrs) {
			result.push(new Vec3(arr[0], arr[1], arr[2]));
		}
		return result;
	}

	public static GetVec4Array(map: { [k: string]: any }, key: string): Vec4[] | null {
		let arrs: number[][] = this.GetArray(map, key);
		if (arrs == null)
			return null;
		let result: Vec4[] = [];
		for (let arr of arrs) {
			result.push(new Vec4(arr[0], arr[1], arr[2], arr[3]));
		}
		return result;
	}

	public static GetVec2(map: { [k: string]: any }, key: string): Vec2 | null {
		let arr: any[] = this.GetArray(map, key);
		if (arr == null)
			return null;
		return new Vec2(arr[0], arr[1]);
	}

	public static GetVec3(map: { [k: string]: any }, key: string): Vec3 | null {
		let arr: any[] = this.GetArray(map, key);
		if (arr == null)
			return null;
		return new Vec3(arr[0], arr[1], arr[2]);
	}

	public static GetVec4(map: { [k: string]: any }, key: string): Vec4 | null {
		let arr: any[] = this.GetArray(map, key);
		if (arr == null)
			return null;
		return new Vec4(arr[0], arr[1], arr[2], arr[3]);
	}
}