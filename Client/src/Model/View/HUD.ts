import { Global } from "../../Global";
import Queue from "../../RC/Collections/Queue";
import { VChampion } from "./VChampion";

export class HUD {
	private _owner: VChampion;

	constructor(owner: VChampion) {
		this._owner = owner;
	}

	public Update(dt: number): void {
	}

	public PopText(type: PopTextType, value: number): void {
		const popText = PopText.Pop();
		popText.Show(type, value, this._owner.position.x, this._owner.position.y);
	}
}

export enum PopTextType {
	Hurt,
	Heal
}

class PopText {
	private static readonly POOL = new Queue<PopText>();

	public static Pop(): PopText {
		if (this.POOL.size() == 0)
			return new PopText();
		return this.POOL.dequeue();
	}

	public static Push(element: PopText): void {
		this.POOL.enqueue(element);
	}

	private _root: fairygui.GComponent;
	private _hurt: fairygui.GComponent;
	private _heal: fairygui.GComponent;

	constructor() {
		this._hurt = fairygui.UIPackage.createObject("battle", "hurt_text").asCom;
		this._heal = fairygui.UIPackage.createObject("battle", "heal_text").asCom;
	}

	public Show(type: PopTextType, value: number, x: number, y: number): void {
		let str;
		switch (type) {
			case PopTextType.Hurt:
				this._root = this._hurt;
				str = "-" + value;
				break;

			case PopTextType.Heal:
				this._root = this._heal;
				str = "+" + value;
				break;
		}
		Global.graphic.hudRoot.addChild(this._root);
		this._root.setXY(x, y);
		this._root.getChild("n0").asTextField.text = str;
		this._root.getTransition("t0").play(new laya.utils.Handler(this, this.OnTransitionComplete), 1, 0, 0, -1);
	}

	private OnTransitionComplete(): void {
		Global.graphic.hudRoot.removeChild(this._root);
		PopText.Push(this);
	}
}