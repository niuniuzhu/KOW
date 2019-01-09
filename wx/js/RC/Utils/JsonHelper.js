export class JsonHelper {
    static Parse(json) {
        json = json.replace("\/\*+[^\*]*\*+/\g", "");
        return JSON.parse(json);
    }
}
