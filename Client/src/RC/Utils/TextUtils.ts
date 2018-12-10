export class TextUtils {
	public static DecodeUTF8(arr: Uint8Array): string {
		let str = "";
		for (let i = 0; i < arr.length; i++) {
			str += String.fromCharCode(arr[i]);
		}
		decodeURIComponent(escape(str));
		return str;
	}
}