import { Hashtable } from "./Hashtable";

export class JsonHelper {
	public static Parse(json: string): Hashtable {
		json = json.replace("\/\*+[^\*]*\*+/\g", "");
		return JSON.parse(json);
	}
}