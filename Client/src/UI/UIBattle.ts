import { Global } from "../Global";
import { UIEvent } from "../Model/BattleEvent/UIEvent";
import { FrameAciontManager } from "../Model/FrameActionManager";
import { EAttr } from "../Model/Logic/Attribute";
import { VChampion } from "../Model/View/VChampion";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState } from "./GestureState";
import { IUIModule } from "./IUIModule";
import { Joystick } from "./Joystick";

export class UIBattle implements IUIModule {
	public get root(): fairygui.GComponent { return this._root; }

	private readonly _root: fairygui.GComponent;
	private readonly _hpbar: fairygui.GProgressBar;
	private readonly _time0: fairygui.GTextField;
	private readonly _time1: fairygui.GTextField;
	private readonly _endBattle: fairygui.GComponent;
	private readonly _gestureState: GestureState = new GestureState();
	private readonly _frameActionManager: FrameAciontManager = new FrameAciontManager();

	private _touchID: number = -1;
	private _markToEnd: boolean = false;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/battle");
		fairygui.UIPackage.addPackage("res/ui/endlevel");
		fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);

		this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
		this._root.name = "battle_main";
		this._root.getChild("n0").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtnPress);
		this._root.getChild("n0").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtnRelease);
		this._root.getChild("n1").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn2Press);
		this._root.getChild("n1").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn2Release);
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._hpbar = this._root.getChild("n00").asProgress;
		this._time0 = this._root.getChild("s00").asTextField;
		this._time1 = this._root.getChild("s10").asTextField;

		this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;
		this._endBattle.setSize(this._root.width, this._root.height);
		this._endBattle.addRelation(this._root, fairygui.RelationType.Size);

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
		this._touchID = -1;
		this._markToEnd = false;

		Global.graphic.uiRoot.addChild(this._root);
		this._root.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
		this._frameActionManager.Reset();

		UIEvent.AddListener(UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
		UIEvent.AddListener(UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
		UIEvent.AddListener(UIEvent.E_ATTR_CHANGE, this.OnAttrChange.bind(this));
	}

	public Exit(): void {
		UIEvent.RemoveListener(UIEvent.E_ENTITY_INIT);
		UIEvent.RemoveListener(UIEvent.E_END_BATTLE);
		UIEvent.RemoveListener(UIEvent.E_ATTR_CHANGE);

		this.GestureOff();

		if (this._endBattle.parent != null) {
			this._endBattle.removeFromParent();
		}
		this._root.removeFromParent();
	}

	private GestureOff(): void {
		this._gestureState.OnTouchEnd();
		this._touchID = -1;
		this._root.off(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
		this._root.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
		this._root.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
	}

	public Update(dt: number): void {
		this._gestureState.Update(dt);
		this._frameActionManager.Update(dt);
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnChampionInit(e: UIEvent): void {
		//检查是否玩家自己
		if (this.IsSelf(e.champion)) {
			this._root.getChild("n0").data = e.champion.GetSkillAt(0).id;
			this._root.getChild("n1").data = e.champion.GetSkillAt(1).id;
		}
	}

	private OnBattleEnd(e: UIEvent): void {
		this._markToEnd = true;
		this.GestureOff();
		Global.graphic.uiRoot.addChild(this._endBattle);

		const isWin = e.b0;
		const honer = e.v1;
		const callback = e.callback;
		let com: fairygui.GComponent;
		if (isWin) {
			com = this._endBattle.getChild("n0").asCom;
			this._endBattle.getController("c1").selectedIndex = 0;
		}
		else {
			com = this._endBattle.getChild("n1").asCom;
			this._endBattle.getController("c1").selectedIndex = 1;
		}

		const confirmBtn = com.getChild("confirm");
		confirmBtn.onClick(this, () => {
			callback();
			confirmBtn.offClick(this, callback);
		});
		com.getChild("n7").asTextField.text = "" + honer;
	}

	private OnAttrChange(e: UIEvent): void {
		const target = e.champion;
		switch (e.attr) {
			case EAttr.HP:
			case EAttr.MHP:
				if (this.IsSelf(target)) {
					this._hpbar.max = target.mhp;
					this._hpbar.value = target.hp;
				}
				break;

			case EAttr.GLADIATOR_TIME:
				const tf = target.team == 0 ? this._time0 : this._time1;
				const t = target.gladiatorTime < 0 ? 0 : target.gladiatorTime;
				tf.text = "" + Math.floor(t * 0.001);
				break;
		}
	}

	private IsSelf(champion: VChampion): boolean {
		return champion.rid.equals(Global.battleManager.playerID);
	}

	private OnSkillBtnPress(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS1(true);
	}

	private OnSkillBtnRelease(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS1(false);
	}

	private OnSkillBtn2Press(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS2(true);
	}

	private OnSkillBtn2Release(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS2(false);
	}

	private HandleAxisInput(value: Vec2): void {
		if (this._markToEnd)
			return;
		this._frameActionManager.SetInputDirection(value);
	}

	private OnDragStart(e: laya.events.Event): void {
		if (this._touchID != -1 ||
			fairygui.GComponent.cast(e.currentTarget) != this._root)
			return;
		this._touchID = e.touchId;
		this._root.on(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
		this._root.on(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
		this._gestureState.OnTouchBegin(e.stageX, e.stageY);
	}

	private OnDragEnd(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._touchID = -1;
			this._gestureState.OnTouchEnd();
			this._root.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
			this._root.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
		}
	}

	private OnDrag(e: laya.events.Event): void {
		if (e.touchId == this._touchID) {
			this._gestureState.OnDrag(e.stageX, e.stageY);
		}
	}
}