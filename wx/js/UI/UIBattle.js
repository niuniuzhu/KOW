import { Global } from "../Global";
import { UIEvent } from "../Model/BattleEvent/UIEvent";
import { FrameAciontManager } from "../Model/FrameActionManager";
import { EAttr } from "../Model/Logic/Attribute";
import { Vec2 } from "../RC/Math/Vec2";
import { GestureState } from "./GestureState";
import { Joystick } from "./Joystick";
export class UIBattle {
    constructor() {
        this._gestureState = new GestureState();
        this._frameActionManager = new FrameAciontManager();
        this._touchID = -1;
        this._markToEnd = false;
        fairygui.UIPackage.addPackage("res/ui/battle");
        fairygui.UIPackage.addPackage("res/ui/endlevel");
        fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick);
        this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
        this._root.name = "battle_main";
        this._skillBtn0 = this._root.getChild("n0").asCom;
        this._skillBtn1 = this._root.getChild("n1").asCom;
        this._skillBtn0.on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn0Press);
        this._skillBtn0.on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn0Release);
        this._skillBtn1.on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn1Press);
        this._skillBtn1.on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn1Release);
        this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
        this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
        this._hpbar = this._root.getChild("n00").asProgress;
        this._mpBar = this._root.getChild("n1").asCom.getChild("n3").asProgress;
        this._time0 = this._root.getChild("s00").asTextField;
        this._time1 = this._root.getChild("s10").asTextField;
        this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;
        this._endBattle.setSize(this._root.width, this._root.height);
        this._endBattle.addRelation(this._root, fairygui.RelationType.Size);
        this._gestureState.joystick = this._root.getChild("joystick");
        this._gestureState.joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
        this._gestureState.joystick.cen = new Vec2(100, 100);
        this._gestureState.joystick.radius = 100;
        this._gestureState.joystick.resetDuration = 60;
        this._gestureState.onChanged = this.HandleAxisInput.bind(this);
    }
    get root() { return this._root; }
    Dispose() {
        this._gestureState.Dispose();
        this._root.dispose();
    }
    Enter(param) {
        this._touchID = -1;
        this._markToEnd = false;
        Global.graphic.uiRoot.addChild(this._root);
        this._root.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
        this._frameActionManager.Reset();
        UIEvent.AddListener(UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
        UIEvent.AddListener(UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
        UIEvent.AddListener(UIEvent.E_ATTR_CHANGE, this.OnAttrChange.bind(this));
    }
    Exit() {
        UIEvent.RemoveListener(UIEvent.E_ENTITY_INIT);
        UIEvent.RemoveListener(UIEvent.E_END_BATTLE);
        UIEvent.RemoveListener(UIEvent.E_ATTR_CHANGE);
        this.GestureOff();
        if (this._endBattle.parent != null) {
            this._endBattle.removeFromParent();
        }
        this._root.removeFromParent();
    }
    GestureOff() {
        this._gestureState.OnTouchEnd();
        this._touchID = -1;
        this._root.off(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
        this._root.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
        this._root.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
    }
    Update(dt) {
        this._gestureState.Update(dt);
        this._frameActionManager.Update(dt);
    }
    OnResize(e) {
    }
    OnChampionInit(e) {
        if (this.IsSelf(e.champion)) {
            this._skillBtn0.data = e.champion.GetSkillAt(0);
            this._skillBtn1.data = e.champion.GetSkillAt(1);
        }
    }
    OnBattleEnd(e) {
        this._markToEnd = true;
        this.GestureOff();
        Global.graphic.uiRoot.addChild(this._endBattle);
        const isWin = e.b0;
        const honer = e.v1;
        const callback = e.callback;
        let com;
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
    OnAttrChange(e) {
        const target = e.champion;
        switch (e.attr) {
            case EAttr.HP:
            case EAttr.MHP:
                if (this.IsSelf(target)) {
                    this._hpbar.max = target.mhp;
                    this._hpbar.value = target.hp;
                }
                break;
            case EAttr.MP:
            case EAttr.MMP:
                if (this.IsSelf(target)) {
                    this._mpBar.max = target.mmp;
                    this._mpBar.value = target.mp;
                    const skill0 = this._skillBtn0.data;
                    this._skillBtn0.getChild("n2").grayed = target.mp < skill0.mpCost;
                    this._skillBtn0.touchable = target.mp >= skill0.mpCost;
                    const skill1 = this._skillBtn1.data;
                    this._skillBtn1.getChild("n2").grayed = target.mp < skill1.mpCost;
                    this._skillBtn1.touchable = target.mp >= skill1.mpCost;
                }
                break;
            case EAttr.GLADIATOR_TIME:
                const tf = target.team == 0 ? this._time0 : this._time1;
                const t = target.gladiatorTime < 0 ? 0 : target.gladiatorTime;
                tf.text = "" + Math.floor(t * 0.001);
                break;
        }
    }
    IsSelf(champion) {
        return champion.rid.equals(Global.battleManager.playerID);
    }
    OnSkillBtn0Press(e) {
        if (this._markToEnd)
            return;
        e.stopPropagation();
        this._frameActionManager.SetS1(true);
    }
    OnSkillBtn0Release(e) {
        if (this._markToEnd)
            return;
        e.stopPropagation();
        this._frameActionManager.SetS1(false);
    }
    OnSkillBtn1Press(e) {
        if (this._markToEnd)
            return;
        e.stopPropagation();
        this._frameActionManager.SetS2(true);
    }
    OnSkillBtn1Release(e) {
        if (this._markToEnd)
            return;
        e.stopPropagation();
        this._frameActionManager.SetS2(false);
    }
    HandleAxisInput(value) {
        if (this._markToEnd)
            return;
        this._frameActionManager.SetInputDirection(value);
    }
    OnDragStart(e) {
        if (this._touchID != -1 ||
            fairygui.GComponent.cast(e.currentTarget) != this._root)
            return;
        this._touchID = e.touchId;
        this._root.on(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
        this._root.on(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
        this._gestureState.OnTouchBegin(e.stageX, e.stageY);
    }
    OnDragEnd(e) {
        if (e.touchId == this._touchID) {
            this._touchID = -1;
            this._gestureState.OnTouchEnd();
            this._root.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
            this._root.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
        }
    }
    OnDrag(e) {
        if (e.touchId == this._touchID) {
            this._gestureState.OnDrag(e.stageX, e.stageY);
        }
    }
}
