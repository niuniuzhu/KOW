export class StringUtils {
	public static DecodeUTF8(arr: Uint8Array): string {
		let str = "";
		for (let i = 0; i < arr.length; i++) {
			str += String.fromCharCode(arr[i]);
		}
		decodeURIComponent(escape(str));
		return str;
	}

	public static Format(format: string, ...args: string[]): string {
		for (let i = 0; i < args.length; ++i) {
			format = format.replace(`{${i}}`, args[i]);
		}
		return format;
	}
}