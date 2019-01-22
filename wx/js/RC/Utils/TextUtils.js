export class StringUtils {
    static DecodeUTF8(arr) {
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }
        decodeURIComponent(escape(str));
        return str;
    }
    static Format(format, ...args) {
        for (let i = 0; i < args.length; ++i) {
            format = format.replace(`{${i}}`, args[i]);
        }
        return format;
    }
}
