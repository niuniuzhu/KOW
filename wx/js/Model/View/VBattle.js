import { Graphic } from "../../Graphic";
import { PreloadInstance } from "../../Scene/PreloadInstance";
import { Consts } from "../../Consts";
export class VBattle {
    Init(loginRet) {
        Graphic.battleRoot.addChild(PreloadInstance.instances.get(Consts.ASSETS_MAP_PREFIX + loginRet.mapID));
    }
}
