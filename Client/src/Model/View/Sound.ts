import { CDefs } from "../CDefs";
import { Hashtable } from "../../RC/Utils/Hashtable";

export enum SoundType {
	Music,
	Sound
}

export class Sound {
	public id: number;
	public type: SoundType;
	public name: string;
	public loop: boolean;
	public volume: number;
	public maxOverlay: number;

	constructor(id: number) {
		this.id = id;
		const defs = CDefs.GetSound(id);
		this.type = Hashtable.GetNumber(defs, "type");
		this.name = Hashtable.GetString(defs, "url");
		this.loop = Hashtable.GetBool(defs, "loop");
		this.volume = Hashtable.GetNumber(defs, "volume");
		this.maxOverlay = Hashtable.GetNumber(defs, "max_overlay");
	}
}