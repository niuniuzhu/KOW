define(["require", "exports", "../Global", "../Model/BattleEvent/UIEvent", "../Model/FrameActionManager", "../RC/Math/Vec2", "./GestureState", "./Joystick"], function (require, exports, Global_1, UIEvent_1, FrameActionManager_1, Vec2_1, GestureState_1, Joystick_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIBattle {
        constructor() {
            this._gestureState = new GestureState_1.GestureState();
            this._frameActionManager = new FrameActionManager_1.FrameAciontManager();
            this._touchID = -1;
            fairygui.UIPackage.addPackage("res/ui/battle");
            fairygui.UIPackage.addPackage("res/ui/endlevel");
            fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick_1.Joystick);
            this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
            this._root.getChild("n0").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtnPress);
            this._root.getChild("n0").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtnRelease);
            this._root.getChild("n1").on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn2Press);
            this._root.getChild("n1").on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn2Release);
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;
            this._gestureState.joystick = this._root.getChild("joystick");
            this._gestureState.joystick.core = this._root.getChild("joystick").asCom.getChild("n1").asCom;
            this._gestureState.joystick.cen = new Vec2_1.Vec2(100, 100);
            this._gestureState.joystick.radius = 100;
            this._gestureState.joystick.resetDuration = 60;
            this._gestureState.onChanged = this.HandleAxisInput.bind(this);
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
        }
        get root() { return this._root; }
        Dispose() {
            this._gestureState.Dispose();
            this._root.dispose();
        }
        Enter(param) {
            this._touchID = -1;
            Global_1.Global.graphic.uiRoot.addChild(this._root);
            fairygui.GRoot.inst.on(laya.events.Event.MOUSE_DOWN, this, this.OnDragStart);
            this._frameActionManager.Reset();
        }
        Exit() {
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
        Update(dt) {
            this._gestureState.Update(dt);
            this._frameActionManager.Update(dt);
        }
        OnResize(e) {
        }
        OnChampionInit(e) {
            if (e.b0) {
                this._player = e.champion;
                this._root.getChild("n0").data = this._player.GetSkillAt(0).id;
                this._root.getChild("n1").data = this._player.GetSkillAt(1).id;
            }
        }
        OnBattleEnd(e) {
            Global_1.Global.graphic.uiRoot.addChild(this._endBattle);
            const isWin = e.b0;
            const honer = e.v1;
            let com;
            if (isWin) {
                com = this._endBattle.getChild("n0").asCom;
            }
            else {
                com = this._endBattle.getChild("n1").asCom;
            }
            com.getChild("confirm").onClick(this, () => e.callback);
            com.getChild("n7").asTextField.text = "" + honer;
        }
        OnSkillBtnPress() {
            this._frameActionManager.SetS1(true);
        }
        OnSkillBtnRelease() {
            this._frameActionManager.SetS1(false);
        }
        OnSkillBtn2Press() {
            this._frameActionManager.SetS2(true);
        }
        OnSkillBtn2Release() {
            this._frameActionManager.SetS2(false);
        }
        HandleAxisInput(value) {
            this._frameActionManager.SetInputDirection(value);
        }
        OnDragStart(e) {
            if (this._touchID != -1)
                return;
            if (e.stageX >= fairygui.GRoot.inst.width * 0.5)
                return;
            this._touchID = e.touchId;
            fairygui.GRoot.inst.on(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
            fairygui.GRoot.inst.on(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
            this._gestureState.OnTouchBegin(e.stageX, e.stageY);
        }
        OnDragEnd(e) {
            if (e.touchId == this._touchID) {
                this._touchID = -1;
                this._gestureState.OnTouchEnd();
                fairygui.GRoot.inst.off(laya.events.Event.MOUSE_UP, this, this.OnDragEnd);
                fairygui.GRoot.inst.off(laya.events.Event.MOUSE_MOVE, this, this.OnDrag);
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