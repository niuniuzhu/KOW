import { Graphic } from "../../Graphic";
import { Protos } from "../../Libs/protos";
import { PreloadInstance } from "../../Scene/PreloadInstance";
import { Consts } from "../../Consts";

export class VBattle {
	public Init(loginRet: Protos.BS2GC_LoginRet): void {
		Graphic.battleRoot.addChild(PreloadInstance.instances.get(Consts.ASSETS_MAP_PREFIX + loginRet.mapID));
	}
}