import { Global } from "../Global";
import { UIEvent } from "../Model/BattleEvent/UIEvent";
import { FrameAciontManager } from "../Model/FrameActionManager";
import { VChampion } from "../Model/View/VChampion";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState } from "./GestureState";
import { IUIModule } from "./IUIModule";
import { Joystick } from "./Joystick";

export class UIBattle implements IUIModule {
	public get root(): fairygui.GComponent { return this._root; }

	private readonly _root: fairygui.GComponent;
	private readonly _endBattle: fairygui.GComponent;
	private readonly _gestureState: GestureState = new GestureState();
	private readonly _frameActionManager: FrameAciontManager = new FrameAciontManager();

	private _player: VChampion;
	private _touchID: number = -1;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/battle");
		fairygui.UIPackage.addPackage("res/ui/endlevel");
		fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);

		this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
		this._root.getChild("n0").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtnPress);
		this._root.getChild("n0").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtnRelease);
		this._root.getChild("n1").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn2Press);
		this._root.getChild("n1").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn2Release);
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;

		this._gestureState.joystick = <Joystick>this._root.getChild("joystick");
		this._gestureState.joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
		this._gestureState.joystick.cen = new Vec2(100, 100);
		this._gestureState.joystick.radius = 100;
		this._gestureState.joystick.resetDuration = 60;
		this._gestureState.onChanged = this.HandleAxisInput.bind(this);

		UIEvent.AddListener(UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
		UIEvent.AddListener(UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
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
		this._root.removeFromParent();
		if (this._endBattle.parent != null) {
			this._endBattle.removeFromParent();
		}
		this._player = null;
		this._touchID = -1;
	}

	public Update(dt: number): void {
		this._gestureState.Update(dt);
		this._frameActionManager.Update(dt);
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnChampionInit(e: UIEvent): void {
		//检查是否玩家自己
		if (e.b0) {
			this._player = e.champion;
			this._root.getChild("n0").data = this._player.GetSkillAt(0).id;
			this._root.getChild("n1").data = this._player.GetSkillAt(1).id;
		}
	}

	private OnBattleEnd(e: UIEvent): void {
		Global.graphic.uiRoot.addChild(this._endBattle);
		const isWin = e.b0;
		const honer = e.v1;
		let com: fairygui.GComponent;
		if (isWin) {
			com = this._endBattle.getChild("n0").asCom;
		}
		else {
			com = this._endBattle.getChild("n1").asCom;
		}
		com.getChild("confirm").onClick(this, () => e.callback);
		com.getChild("n7").asTextField.text = "" + honer;
	}

	private OnSkillBtnPress(): void {
		this._frameActionManager.SetS1(true);
	}

	private OnSkillBtnRelease(): void {
		this._frameActionManager.SetS1(false);
	}

	private OnSkillBtn2Press(): void {
		this._frameActionManager.SetS2(true);
	}

	private OnSkillBtn2Release(): void {
		this._frameActionManager.SetS2(false);
	}

	private HandleAxisInput(value: Vec2): void {
		this._frameActionManager.SetInputDirection(value);
	}

	private OnDragStart(e: laya.events.Event): void {
		if (this._touchID != -1)
			return;
		if (e.stageX >= fairygui.GRoot.inst.width * 0.5)
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