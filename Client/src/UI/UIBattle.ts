import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { UIEvent } from "../Model/BattleEvent/UIEvent";
import { BattleInfo } from "../Model/BattleInfo";
import { EAttr } from "../Model/Logic/Attribute";
import { Skill } from "../Model/Skill";
import { FrameAciontManager } from "../Model/View/FrameActionManager";
import { VChampion } from "../Model/View/VChampion";
import { MathUtils } from "../RC/Math/MathUtils";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState2 } from "./GestureState2";
import { IUIModule } from "./IUIModule";
import { Joystick } from "./Joystick";
import { Consts } from "../Consts";

export class UIBattle implements IUIModule {
	public get root(): fairygui.GComponent { return this._root; }

	private readonly _root: fairygui.GComponent;
	private readonly _hpProgress: fairygui.GProgressBar;
	private readonly _hpbar: fairygui.GImage;
	private readonly _hpbarBg: fairygui.GImage;
	private readonly _skillBtn0: fairygui.GButton;
	private readonly _skill0Progress: fairygui.GProgressBar;
	private readonly _skillBtn1: fairygui.GButton;
	private readonly _skill1Progress: fairygui.GProgressBar;
	private readonly _timeList: fairygui.GList;
	private readonly _endBattle: fairygui.GComponent;
	private readonly _gestureState: GestureState2;
	private readonly _frameActionManager: FrameAciontManager = new FrameAciontManager();

	private _markToEnd: boolean = false;
	private _keyInput = Vec2.zero;
	private _lastKeyInput = Vec2.zero;

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/battle");
		fairygui.UIPackage.addPackage("res/ui/endlevel");
		fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);

		this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
		this._root.name = "battle_main";
		this._skillBtn0 = this._root.getChild("n0").asButton;
		this._skill0Progress = this._skillBtn0.getChild("n3").asProgress;
		this._skillBtn1 = this._root.getChild("n1").asButton;
		this._skill1Progress = this._skillBtn1.getChild("n3").asProgress;
		this._skillBtn0.on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn0Press);
		this._skillBtn0.on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn0Release);
		this._skillBtn1.on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn1Press);
		this._skillBtn1.on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn1Release);
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);

		this._hpProgress = this._root.getChild("n00").asProgress;
		this._hpbar = this._hpProgress.getChild("bar").asImage;
		this._hpbarBg = this._hpProgress.getChild("di").asImage;

		this._timeList = this._root.getChild("t_list").asList;

		this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;
		this._endBattle.setSize(this._root.width, this._root.height);
		this._endBattle.addRelation(this._root, fairygui.RelationType.Size);

		this._gestureState = new GestureState2(this._root);
		this._gestureState.onChanged = this.HandleAxisInput.bind(this);
	}

	public Dispose(): void {
		this._gestureState.Dispose();
		this._root.dispose();
	}

	public Enter(param: any): void {
		this._markToEnd = false;

		Global.graphic.uiRoot.addChild(this._root);
		this._frameActionManager.Reset();
		this._gestureState.OnEnter();

		Laya.stage.on(Laya.Event.KEY_DOWN, this, this.OnKeyDown);
		Laya.stage.on(Laya.Event.KEY_UP, this, this.OnKeyUp);

		const battleInfo = <BattleInfo>param;
		for (const teamInfo of battleInfo.teamInfos) {
			const item = this._timeList.addItemFromPool().asCom;
			item.getController("c1").selectedIndex = 0;
			for (const player of teamInfo.playerInfos) {
				if (player.gcNID.equals(battleInfo.playerID)) {
					item.getController("c1").selectedIndex = 1;
					this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = player.avatar;
					this._root.getChild("nickname").asTextField.text = player.nickname;
					let r = player.rank - player.rank % Consts.RANK_STEP;
					r = r < Consts.RANK_START ? Consts.RANK_START : r;
					this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
					this._root.getChild("rank").asTextField.text = "" + (player.rank < 0 ? 0 : player.rank);
					break;
				}
			}
		}

		UIEvent.AddListener(UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
		UIEvent.AddListener(UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
		UIEvent.AddListener(UIEvent.E_ATTR_CHANGE, this.OnAttrChange.bind(this));
		UIEvent.AddListener(UIEvent.E_GLADIATOR_TIME_CHANGE, this.OnGladiatorTimeChange.bind(this));
	}

	public Exit(): void {
		UIEvent.RemoveListener(UIEvent.E_ENTITY_INIT);
		UIEvent.RemoveListener(UIEvent.E_END_BATTLE);
		UIEvent.RemoveListener(UIEvent.E_ATTR_CHANGE);
		UIEvent.RemoveListener(UIEvent.E_GLADIATOR_TIME_CHANGE);

		this._gestureState.OnExit();
		this.GestureOff();

		this._timeList.removeChildrenToPool();
		if (this._endBattle.parent != null) {
			this._endBattle.removeFromParent();
		}
		this._root.removeFromParent();
	}

	private GestureOff(): void {
		Laya.stage.off(Laya.Event.KEY_DOWN, this, this.OnKeyDown);
		Laya.stage.off(Laya.Event.KEY_UP, this, this.OnKeyUp);
	}

	public Update(dt: number): void {
		this._gestureState.OnUpdate(dt);
		this._frameActionManager.Update(dt);
		this._hpbarBg.width = MathUtils.Lerp(this._hpbarBg.width, this._hpbar.width, dt * 0.0015);
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnChampionInit(e: UIEvent): void {
		//检查是否玩家自己
		if (this.IsSelf(e.champion)) {
			this._skillBtn0.data = e.champion.GetSkillAt(0);
			this._skillBtn1.data = e.champion.GetSkillAt(2);
		}
	}

	private OnBattleEnd(e: UIEvent): void {
		this._markToEnd = true;
		this.GestureOff();
		Global.graphic.uiRoot.addChild(this._endBattle);

		const result = <Protos.CS2GC_BattleEnd.Result>e.any0;
		const rank = e.v1;
		const callback = e.callback;
		let com: fairygui.GComponent;
		switch (result) {
			case Protos.CS2GC_BattleEnd.Result.Win:
				com = this._endBattle.getChild("n0").asCom;
				this._endBattle.getController("c1").selectedIndex = 0;
				break;
			case Protos.CS2GC_BattleEnd.Result.Draw:
			case Protos.CS2GC_BattleEnd.Result.Lose:
				com = this._endBattle.getChild("n1").asCom;
				this._endBattle.getController("c1").selectedIndex = 1;
				break;
		}
		com.getTransition("t0").play();
		const confirmBtn = com.getChild("confirm");
		confirmBtn.onClick(this, () => {
			callback();
			confirmBtn.offClick(this, callback);
		});
		com.getChild("n7").asTextField.text = "" + rank;
		//更新主界面的分值
		Global.sceneManager.main.UpdateRank(rank);
	}

	private OnAttrChange(e: UIEvent): void {
		const target = e.champion;
		switch (e.attr) {
			case EAttr.HP:
			case EAttr.MHP:
				if (this.IsSelf(target)) {
					this._hpProgress.max = target.mhp;
					this._hpProgress.value = target.hp;
				}
				break;

			case EAttr.MP:
			case EAttr.MMP:
				if (this.IsSelf(target)) {
					//check mp
					const skill0 = <Skill>this._skillBtn0.data;
					this._skillBtn0.getChild("icon").grayed = target.mp < skill0.mpCost;
					this._skillBtn0.touchable = target.mp >= skill0.mpCost;
					this._skill0Progress.max = skill0.mpCost;
					this._skill0Progress.value = target.mp;

					const skill1 = <Skill>this._skillBtn1.data;
					this._skillBtn1.getChild("icon").grayed = target.mp < skill1.mpCost;
					this._skillBtn1.touchable = target.mp >= skill1.mpCost;
					this._skill1Progress.max = skill1.mpCost;
					this._skill1Progress.value = target.mp;
				}
				break;
		}
	}

	private OnGladiatorTimeChange(e: UIEvent): void {
		const tf = this._timeList.getChildAt(e.team).asCom.getChild("time").asTextField;
		const t = e.v0 < 0 ? 0 : e.v0;
		tf.text = "" + Math.floor(t * 0.001);
	}

	private IsSelf(champion: VChampion): boolean {
		return champion.rid.equals(Global.battleManager.playerID);
	}

	private OnSkillBtn0Press(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS1(true);
	}

	private OnSkillBtn0Release(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS1(false);
	}

	private OnSkillBtn1Press(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		e.stopPropagation();
		this._frameActionManager.SetS2(true);
	}

	private OnSkillBtn1Release(e: laya.events.Event): void {
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

	private OnKeyDown(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		switch (e.keyCode) {
			case laya.events.Keyboard.J:
				this._frameActionManager.SetS1(true);
				return;
			case laya.events.Keyboard.K:
				this._frameActionManager.SetS2(true);
				return;
			case laya.events.Keyboard.W:
				this._keyInput.y = -1;
				break;
			case laya.events.Keyboard.S:
				this._keyInput.y = 1;
				break;
			case laya.events.Keyboard.A:
				this._keyInput.x = -1;
				break;
			case laya.events.Keyboard.D:
				this._keyInput.x = 1;
				break;
		}
		if (MathUtils.Approximately(this._keyInput.x, this._lastKeyInput.x) &&
			MathUtils.Approximately(this._keyInput.y, this._lastKeyInput.y))
			return;
		this._lastKeyInput.CopyFrom(this._keyInput);
		this._keyInput.NormalizeSafe();
		this._frameActionManager.SetInputDirection(this._keyInput);
	}

	private OnKeyUp(e: laya.events.Event): void {
		if (this._markToEnd)
			return;
		switch (e.keyCode) {
			case laya.events.Keyboard.J:
				this._frameActionManager.SetS1(false);
				return;
			case laya.events.Keyboard.K:
				this._frameActionManager.SetS2(false);
				return;
			case laya.events.Keyboard.W:
			case laya.events.Keyboard.S:
				this._keyInput.y = 0;
				break;
			case laya.events.Keyboard.A:
			case laya.events.Keyboard.D:
				this._keyInput.x = 0;
				break;
		}
		if (MathUtils.Approximately(this._keyInput.x, this._lastKeyInput.x) &&
			MathUtils.Approximately(this._keyInput.y, this._lastKeyInput.y))
			return;
		this._lastKeyInput.CopyFrom(this._keyInput);
		this._keyInput.NormalizeSafe()
		this._frameActionManager.SetInputDirection(this._keyInput);
	}
}