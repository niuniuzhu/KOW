import { Global } from "../../Global";
import Queue from "../../RC/Collections/Queue";
import { VChampion } from "./VChampion";

export class HUD {
	private readonly _owner: VChampion;
	private readonly _root: fairygui.GComponent;
	private readonly _texts: PopText[] = [];

	constructor(owner: VChampion) {
		this._owner = owner;
		this._root = fairygui.UIPackage.createObject("battle", "HUD").asCom;
		Global.graphic.hudRoot.addChild(this._root);
	}

	public OnDecodeSync(): void {
		this._root.getController("c1").selectedIndex = this._owner.self ? 0 : 1;
		this._root.getChild("n0").asTextField.text = this._owner.name;
	}

	public Destroy(): void {
		this._root.dispose();
		while (this._texts.length > 0) {
			this._texts[0].Complete();
		}
	}

	public Update(dt: number): void {
		this._root.setXY(this._owner.position.x, this._owner.position.y + this._owner.hudOffsetY);
	}

	public PopText(type: PopTextType, value: number): void {
		const popText = PopText.Pop();
		this._texts.push(popText);
		popText.onComplete = () => this._texts.splice(this._texts.indexOf(popText), 1);
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

	public onComplete: () => void;

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
		this._root.getTransition("t0").play(laya.utils.Handler.create(this, this.OnTransitionComplete), 1, 0, 0, -1);
	}

	public Complete(): void {
		this._root.getTransition("t0").stop(false, true);
	}

	private OnTransitionComplete(): void {
		if (this.onComplete != null) {
			this.onComplete();
		}
		Global.graphic.hudRoot.removeChild(this._root);
		this._root = null;
		this.onComplete = null;
		PopText.Push(this);
	}
}