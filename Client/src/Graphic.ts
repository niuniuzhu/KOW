export class Graphic {
	private static _battleRoot: fairygui.GComponent;
	private static _uiRoot: fairygui.GComponent;

	public static get battleRoot(): fairygui.GComponent { return this._battleRoot; }
	public static get uiRoot(): fairygui.GComponent { return this._uiRoot; }

	public static Init(): void {
		this._battleRoot = new fairygui.GComponent();
		this._battleRoot.name = "battle_root";
		this._battleRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this._battleRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		fairygui.GRoot.inst.addChild(this._battleRoot);

		this._uiRoot = new fairygui.GComponent();
		this._uiRoot.name = "ui_root";
		this._uiRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this._uiRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		fairygui.GRoot.inst.addChild(this._uiRoot);
	}
}