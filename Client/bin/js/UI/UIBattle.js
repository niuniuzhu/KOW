define(["require", "exports", "../Global", "../Model/BattleEvent/UIEvent", "../Model/FrameActionManager", "../RC/Math/Vec2", "./GestureState", "./Joystick", "../Model/Logic/Attribute", "../RC/Utils/Logger"], function (require, exports, Global_1, UIEvent_1, FrameActionManager_1, Vec2_1, GestureState_1, Joystick_1, Attribute_1, Logger_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIBattle {
        constructor() {
            this._gestureState = new GestureState_1.GestureState();
            this._frameActionManager = new FrameActionManager_1.FrameAciontManager();
            this._touchID = -1;
            this._markToEnd = false;
            fairygui.UIPackage.addPackage("res/ui/battle");
            fairygui.UIPackage.addPackage("res/ui/endlevel");
            fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick_1.Joystick);
            this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
            this._root.name = "battle_main";
            this._root.getChild("n0").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtnPress);
            this._root.getChild("n0").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtnRelease);
            this._root.getChild("n1").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn2Press);
            this._root.getChild("n1").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn2Release);
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._hpbar = this._root.getChild("n00").asProgress;
            this._time0 = this._root.getChild("s00").asTextField;
            this._time1 = this._root.getChild("s10").asTextField;
            this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;
            this._endBattle.setSize(this._root.width, this._root.height);
            this._endBattle.addRelation(this._root, fairygui.RelationType.Size);
            this._gestureState.joystick = this._root.getChild("joystick");
            this._gestureState.joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
            this._gestureState.joystick.cen = new Vec2_1.Vec2(100, 100);
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
            Global_1.Global.graphic.uiRoot.addChild(this._root);
            this._root.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
            this._frameActionManager.Reset();
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_ATTR_CHANGE, this.OnAttrChange.bind(this));
        }
        Exit() {
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_ENTITY_INIT);
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_END_BATTLE);
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_ATTR_CHANGE);
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
                this._root.getChild("n0").data = e.champion.GetSkillAt(0).id;
                this._root.getChild("n1").data = e.champion.GetSkillAt(1).id;
            }
        }
        OnBattleEnd(e) {
            this._markToEnd = true;
            this.GestureOff();
            Global_1.Global.graphic.uiRoot.addChild(this._endBattle);
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
                case Attribute_1.EAttr.HP:
                case Attribute_1.EAttr.MHP:
                    if (this.IsSelf(target)) {
                        this._hpbar.max = target.mhp;
                        this._hpbar.value = target.hp;
                    }
                    break;
                case Attribute_1.EAttr.GLADIATOR_TIME:
                    const tf = target.team == 0 ? this._time0 : this._time1;
                    const t = target.gladiatorTime < 0 ? 0 : target.gladiatorTime;
                    tf.text = "" + Math.floor(t * 0.001);
                    Logger_1.Logger.Log(tf.text);
                    break;
            }
        }
        IsSelf(champion) {
            return champion.rid.equals(Global_1.Global.battleManager.playerID);
        }
        OnSkillBtnPress(e) {
            if (this._markToEnd)
                return;
            e.stopPropagation();
            this._frameActionManager.SetS1(true);
        }
        OnSkillBtnRelease(e) {
            if (this._markToEnd)
                return;
            e.stopPropagation();
            this._frameActionManager.SetS1(false);
        }
        OnSkillBtn2Press(e) {
            if (this._markToEnd)
                return;
            e.stopPropagation();
            this._frameActionManager.SetS2(true);
        }
        OnSkillBtn2Release(e) {
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
    exports.UIBattle = UIBattle;
});
//# sourceMappingURL=UIBattle.js.map