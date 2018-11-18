import { Global } from "../Global";
import { FrameAciontManager } from "../Model/FrameActionManager";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState } from "./GestureState";
import { IUIModule } from "./IUIModule";
import { Joystick } from "./Joystick";

export class UIBattle implements IUIModule {
	public get root(): fairygui.GComponent { return this._root; }

	private readonly _root: fairygui.GComponent;
	private readonly _gestureState: GestureState = new GestureState();
	private readonly _frameActionManager: FrameAciontManager = new FrameAciontManager();

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/battle");
		fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);

		this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
		this._root.getChild("n0").onClick(this, this.OnSkillBtnClick);
		this._root.getChild("n1").onClick(this, this.OnSkill2BtnClick);
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._gestureState.joystick = <Joystick>this._root.getChild("joystick");
		this._gestureState.joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
		this._gestureState.joystick.cen = new Vec2(100, 100);
		this._gestureState.joystick.radius = 100;
		this._gestureState.joystick.resetDuration = 60;
		this._gestureState.onChanged = this.HandleAxisInput.bind(this);
	}

	public Dispose(): void {
		this._gestureState.Dispose();
		this._root.dispose();
	}

	public Enter(param: any): void {
		Global.graphic.uiRoot.addChild(this._root);
		fairygui.GRoot.inst.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
		this._frameActionManager.Reset();
	}

	public Exit(): void {
		fairygui.GRoot.inst.off(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
		fairygui.GRoot.inst.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
		fairygui.GRoot.inst.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
		this._gestureState.Update(dt);
		this._frameActionManager.Update(dt);
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnSkillBtnClick(): void {
	}

	private OnSkill2BtnClick(): void {
	}

	private HandleAxisInput(value: Vec2): void {
		this._frameActionManager.SetInputDirection(value);
	}

	private OnDragStart(e: laya.events.Event): void {
		if (e.touchId == 0) {
			fairygui.GRoot.inst.on(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
			fairygui.GRoot.inst.on(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
			this._gestureState.OnTouchBegin(e.stageX, e.stageY);
		}
	}

	private OnDragEnd(e: laya.events.Event): void {
		if (e.touchId == 0) {
			this._gestureState.OnTouchEnd();
			fairygui.GRoot.inst.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
			fairygui.GRoot.inst.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
		}
	}

	private OnDrag(e: laya.events.Event): void {
		if (e.touchId == 0) {
			this._gestureState.OnDrag(e.stageX, e.stageY);
		}
	}
}