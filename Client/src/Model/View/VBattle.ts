import { Graphic } from "../../Graphic";
import { PreloadInstance } from "../../Scene/PreloadInstance";

export class VBattle {
	constructor() {
		Graphic.battleRoot.addChild(PreloadInstance.instances.get("map"));
	}
}