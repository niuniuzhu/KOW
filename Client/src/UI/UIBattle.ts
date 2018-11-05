import { IUIModule } from "./IUIModule";
import { GestureState } from "./GestureState";
import { Joystick } from "./Joystick";
import { Global } from "../Global";

export class UIBattle implements IUIModule {
	public get root(): fairygui.GComponent { return this._root; }

	private readonly _root: fairygui.GComponent;
	private readonly _gestureState: GestureState = new GestureState();

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/battle");
		fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);

		this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
		this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
		this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
		this._root.displayObject.on(laya.events.Event.DRAG_START, this, this.OnDragStart);
		this._root.displayObject.on(laya.events.Event.DRAG_END, this, this.OnDragEnd);
		this._root.displayObject.on(laya.events.Event.DRAG_MOVE, this, this.OnDrag);

		this._gestureState.joystick = <Joystick>this._root.getChild("joystick");
	}

	public Dispose(): void {
		this._gestureState.Dispose();
		this._root.dispose();
	}

	public Enter(param: any): void {
		Global.graphic.uiRoot.addChild(this._root);
	}

	public Exit(): void {
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
		this._gestureState.Update(dt);
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnSkillBtnClick(): void {
	}

	private OnSkill2BtnClick(): void {
	}

	private OnDragStart(e: laya.events.Event): void {
		if (e.touchId == 0)
			this._gestureState.OnTouchBegin(e.stageX, e.stageY);
	}

	private OnDragEnd(e: laya.events.Event): void {
		if (e.touchId == 0)
			this._gestureState.OnTouchEnd();
	}

	private OnDrag(e: laya.events.Event): void {
		if (e.touchId == 0)
			this._gestureState.OnDrag(e.stageX, e.stageY);
	}
}