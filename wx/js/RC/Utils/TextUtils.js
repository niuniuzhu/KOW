export class TextUtils {
    static DecodeUTF8(arr) {
        let str = "";
        for (let i = 0; i < arr.length; i++) {
            str += String.fromCharCode(arr[i]);
        }
        decodeURIComponent(escape(str));
        return str;
    }
}
