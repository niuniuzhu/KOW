import { Global } from "../Global";
import { UIEvent } from "../Model/BattleEvent/UIEvent";
import { FrameAciontManager } from "../Model/FrameActionManager";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState } from "./GestureState";
import { IUIModule } from "./IUIModule";
import { Joystick } from "./Joystick";
import { VEntity } from "../Model/View/VEntity";
import { Logger } from "../RC/Utils/Logger";

export class UIBattle implements IUIModule {
	public get root(): fairygui.GComponent { return this._root; }

	private readonly _root: fairygui.GComponent;
	private readonly _gestureState: GestureState = new GestureState();
	private readonly _frameActionManager: FrameAciontManager = new FrameAciontManager();

	private _player: VEntity;
	private _touchID: number = -1;

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

		UIEvent.AddListener(UIEvent.E_ENTITY_INIT, this.OnEntityInit.bind(this));
	}

	public Dispose(): void {
		this._gestureState.Dispose();
		this._root.dispose();
	}

	public Enter(param: any): void {
		this._touchID = -1;
		Global.graphic.uiRoot.addChild(this._root);
		fairygui.GRoot.inst.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
		this._frameActionManager.Reset();
	}

	public Exit(): void {
		this._gestureState.OnTouchEnd();
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

	private OnEntityInit(e: UIEvent): void {
		//检查是否玩家自己
		if (e.b0) {
			this._player = e.entity
			this._root.getChild("n0").data = this._player.GetSkillAt(0).id;
			this._root.getChild("n1").data = this._player.GetSkillAt(1).id;
		}
	}

	private OnSkillBtnClick(): void {
		this._frameActionManager.SetInputSkill(<number>this._root.getChild("n0").data);
	}

	private OnSkill2BtnClick(): void {
		this._frameActionManager.SetInputSkill(<number>this._root.getChild("n1").data);
	}

	private HandleAxisInput(value: Vec2): void {
		this._frameActionManager.SetInputDirection(value);
	}

	private OnDragStart(e: laya.events.Event): void {
		if (this._touchID != -1)
			return;
		this._touchID = e.touchId;
		fairygui.GRoot.inst.on(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
		fairygui.GRoot.inst.on(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
		this._gestureState.OnTouchBegin(e.stageX, e.stageY);
	}

	private OnDragEnd(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._touchID = -1;
			this._gestureState.OnTouchEnd();
			fairygui.GRoot.inst.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
			fairygui.GRoot.inst.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
		}
	}

	private OnDrag(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._gestureState.OnDrag(e.stageX, e.stageY);
		}
	}
}