export class Graphic {
	private _battleRoot: fairygui.GComponent;
	private _mapRoot: fairygui.GComponent;
	private _entityRoot: fairygui.GComponent;
	private _uiRoot: fairygui.GComponent;

	public get battleRoot(): fairygui.GComponent { return this._battleRoot; }
	public get mapRoot(): fairygui.GComponent { return this._mapRoot; }
	public get entityRoot(): fairygui.GComponent { return this._entityRoot; }
	public get uiRoot(): fairygui.GComponent { return this._uiRoot; }

	public Init(): void {
		this._battleRoot = new fairygui.GComponent();
		this._battleRoot.name = "battle_root";
		this._battleRoot.setSize(0, 0);
		this._battleRoot.center();
		this._battleRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Center_Center);
		this._battleRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Middle_Middle);
		fairygui.GRoot.inst.addChild(this._battleRoot);

		this._mapRoot = new fairygui.GComponent();
		this._mapRoot.name = "map_root";
		this._mapRoot.setSize(0, 0);
		this._battleRoot.addChild(this._mapRoot);

		this._entityRoot = new fairygui.GComponent();
		this._entityRoot.name = "entity_root";
		this._entityRoot.setSize(0, 0);
		this._battleRoot.addChild(this._entityRoot);

		this._uiRoot = new fairygui.GComponent();
		this._uiRoot.name = "ui_root";
		this._uiRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this._uiRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		fairygui.GRoot.inst.addChild(this._uiRoot);
	}
}