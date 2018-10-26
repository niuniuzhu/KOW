import { IUIModule } from "./IUIModule";

export class UIBattle implements IUIModule  {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/battle");
		this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
		this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
		this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
		this._root.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		fairygui.GRoot.inst.addChild(this._root);
	}

	public Exit(): void {
		fairygui.GRoot.inst.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnSkillBtnClick(): void {
	}

	private OnSkill2BtnClick(): void {
	}
}