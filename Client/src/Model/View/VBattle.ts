import { Graphic } from "../../Graphic";
import { Consts } from "../../Consts";
import { BattleInfo } from "../BattleInfo";

export class VBattle {
	private _root: fairygui.GComponent;

	public Init(battleInfo: BattleInfo): void {
		this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
		Graphic.battleRoot.addChild(this._root);
	}

	public Clear(): void {

	}

	public Update(dt:number): void {
	}
}