export class Graphic {
	private _battleRoot: fairygui.GComponent;
	private _mapRoot: fairygui.GComponent;
	private _lowEffectRoot: fairygui.GComponent;
	private _entityRoot: fairygui.GComponent;
	private _highEffectRoot: fairygui.GComponent;
	private _hudRoot: fairygui.GComponent;
	private _uiRoot: fairygui.GComponent;

	public get battleRoot(): fairygui.GComponent { return this._battleRoot; }
	public get mapRoot(): fairygui.GComponent { return this._mapRoot; }
	public get lowEffectRoot(): fairygui.GComponent { return this._lowEffectRoot; }
	public get entityRoot(): fairygui.GComponent { return this._entityRoot; }
	public get highEffectRoot(): fairygui.GComponent { return this._highEffectRoot; }
	public get hudRoot(): fairygui.GComponent { return this._hudRoot; }
	public get uiRoot(): fairygui.GComponent { return this._uiRoot; }

	public Init(): void {
		const pivot = new fairygui.GComponent();
		fairygui.GRoot.inst.addChild(pivot);
		pivot.setSize(0, 0);
		pivot.center();
		pivot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Center_Center);
		pivot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Middle_Middle);

		this._battleRoot = new fairygui.GComponent();
		this._battleRoot.name = "battle_root";
		this._battleRoot.setSize(0, 0);
		pivot.addChild(this._battleRoot);

		this._mapRoot = new fairygui.GComponent();
		this._mapRoot.name = "map_root";
		this._mapRoot.setSize(0, 0);
		this._battleRoot.addChild(this._mapRoot);

		this._lowEffectRoot = new fairygui.GComponent();
		this._lowEffectRoot.name = "low_effect_root";
		this._lowEffectRoot.setSize(0, 0);
		this._battleRoot.addChild(this._lowEffectRoot);

		this._entityRoot = new fairygui.GComponent();
		this._entityRoot.name = "entity_root";
		this._entityRoot.setSize(0, 0);
		this._battleRoot.addChild(this._entityRoot);

		this._highEffectRoot = new fairygui.GComponent();
		this._highEffectRoot.name = "high_effect_root";
		this._highEffectRoot.setSize(0, 0);
		this._battleRoot.addChild(this._highEffectRoot);

		this._hudRoot = new fairygui.GComponent();
		this._hudRoot.name = "hud_root";
		this._hudRoot.setSize(0, 0);
		this._battleRoot.addChild(this._hudRoot);

		this._uiRoot = new fairygui.GComponent();
		this._uiRoot.name = "ui_root";
		this._uiRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this._uiRoot.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
		fairygui.GRoot.inst.addChild(this._uiRoot);
	}
}