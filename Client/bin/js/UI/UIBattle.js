define(["require", "exports", "../Global", "../Libs/protos", "../Model/BattleEvent/UIEvent", "../Model/Logic/Attribute", "../Model/View/FrameActionManager", "../RC/Math/MathUtils", "../RC/Math/Vec2", "./GestureState2", "./Joystick", "../Consts"], function (require, exports, Global_1, protos_1, UIEvent_1, Attribute_1, FrameActionManager_1, MathUtils_1, Vec2_1, GestureState2_1, Joystick_1, Consts_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UIBattle {
        constructor() {
            this._frameActionManager = new FrameActionManager_1.FrameAciontManager();
            this._markToEnd = false;
            this._keyInput = Vec2_1.Vec2.zero;
            this._lastKeyInput = Vec2_1.Vec2.zero;
            fairygui.UIPackage.addPackage("res/ui/battle");
            fairygui.UIPackage.addPackage("res/ui/endlevel");
            fairygui.UIObjectFactory.setPackageItemExtension(fairygui.UIPackage.getItemURL("battle", "Joystick"), Joystick_1.Joystick);
            this._root = fairygui.UIPackage.createObject("battle", "Main").asCom;
            this._root.name = "battle_main";
            this._skillBtn0 = this._root.getChild("n0").asButton;
            this._skill0Progress = this._skillBtn0.getChild("n5").asProgress;
            this._skillBtn1 = this._root.getChild("n1").asButton;
            this._skill1Progress = this._skillBtn1.getChild("n5").asProgress;
            this._skillBtn0.on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn0Press);
            this._skillBtn0.on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn0Release);
            this._skillBtn1.on(Laya.Event.MOUSE_DOWN, this, this.OnSkillBtn1Press);
            this._skillBtn1.on(Laya.Event.MOUSE_UP, this, this.OnSkillBtn1Release);
            this._root.setSize(Global_1.Global.graphic.uiRoot.width, Global_1.Global.graphic.uiRoot.height);
            this._root.addRelation(Global_1.Global.graphic.uiRoot, fairygui.RelationType.Size);
            this._hpProgress = this._root.getChild("n00").asProgress;
            this._hpbar = this._hpProgress.getChild("bar").asImage;
            this._hpbarBg = this._hpProgress.getChild("n0").asImage;
            this._timeList = this._root.getChild("t_list").asList;
            this._endBattle = fairygui.UIPackage.createObject("endlevel", "Main").asCom;
            this._endBattle.setSize(this._root.width, this._root.height);
            this._endBattle.addRelation(this._root, fairygui.RelationType.Size);
            this._gestureState = new GestureState2_1.GestureState2(this._root);
            this._gestureState.onChanged = this.HandleAxisInput.bind(this);
        }
        get root() { return this._root; }
        Dispose() {
            this._gestureState.Dispose();
            this._root.dispose();
        }
        Enter(param) {
            this._markToEnd = false;
            Global_1.Global.graphic.uiRoot.addChild(this._root);
            this._frameActionManager.Reset();
            this._gestureState.OnEnter();
            Laya.stage.on(Laya.Event.KEY_DOWN, this, this.OnKeyDown);
            Laya.stage.on(Laya.Event.KEY_UP, this, this.OnKeyUp);
            const battleInfo = param;
            for (const teamInfo of battleInfo.teamInfos) {
                const item = this._timeList.addItemFromPool().asCom;
                item.getController("c1").selectedIndex = 0;
                for (const player of teamInfo.playerInfos) {
                    if (player.gcNID.equals(battleInfo.playerID)) {
                        item.getController("c1").selectedIndex = 1;
                        this._root.getChild("image").asCom.getChild("loader").asCom.getChild("icon").asLoader.url = player.avatar;
                        this._root.getChild("nickname").asTextField.text = player.nickname;
                        let r = player.rank - player.rank % Consts_1.Consts.RANK_STEP;
                        r = r < Consts_1.Consts.RANK_START ? Consts_1.Consts.RANK_START : r;
                        this._root.getChild("rank_icon").asLoader.url = fairygui.UIPackage.getItemURL("main", "r" + r);
                        this._root.getChild("rank").asTextField.text = "" + (player.rank < 0 ? 0 : player.rank);
                        break;
                    }
                }
            }
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_ENTITY_INIT, this.OnChampionInit.bind(this));
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_END_BATTLE, this.OnBattleEnd.bind(this));
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_ATTR_CHANGE, this.OnAttrChange.bind(this));
            UIEvent_1.UIEvent.AddListener(UIEvent_1.UIEvent.E_GLADIATOR_TIME_CHANGE, this.OnGladiatorTimeChange.bind(this));
        }
        Exit() {
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_ENTITY_INIT);
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_END_BATTLE);
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_ATTR_CHANGE);
            UIEvent_1.UIEvent.RemoveListener(UIEvent_1.UIEvent.E_GLADIATOR_TIME_CHANGE);
            this._gestureState.OnExit();
            this.GestureOff();
            this._timeList.removeChildrenToPool();
            if (this._endBattle.parent != null) {
                this._endBattle.removeFromParent();
            }
            this._root.removeFromParent();
        }
        GestureOff() {
            Laya.stage.off(Laya.Event.KEY_DOWN, this, this.OnKeyDown);
            Laya.stage.off(Laya.Event.KEY_UP, this, this.OnKeyUp);
        }
        Update(dt) {
            this._gestureState.OnUpdate(dt);
            this._frameActionManager.Update(dt);
            this._hpbarBg.width = MathUtils_1.MathUtils.Lerp(this._hpbarBg.width, this._hpbar.width, dt * 0.0015);
        }
        OnResize(e) {
        }
        OnChampionInit(e) {
            if (this.IsSelf(e.champion)) {
                this._skillBtn0.data = e.champion.GetSkillAt(0);
                this._skillBtn1.data = e.champion.GetSkillAt(2);
            }
        }
        OnBattleEnd(e) {
            this._markToEnd = true;
            this.GestureOff();
            Global_1.Global.graphic.uiRoot.addChild(this._endBattle);
            const result = e.any0;
            const rank = e.v1;
            const callback = e.callback;
            let com;
            switch (result) {
                case protos_1.Protos.CS2GC_BattleEnd.Result.Win:
                    com = this._endBattle.getChild("n0").asCom;
                    this._endBattle.getController("c1").selectedIndex = 0;
                    break;
                case protos_1.Protos.CS2GC_BattleEnd.Result.Draw:
                case protos_1.Protos.CS2GC_BattleEnd.Result.Lose:
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
            this._endBattle.getChild("n4").asTextField.text = "" + rank;
            Global_1.Global.sceneManager.main.UpdateRank(rank);
        }
        OnAttrChange(e) {
            const target = e.champion;
            switch (e.attr) {
                case Attribute_1.EAttr.HP:
                case Attribute_1.EAttr.MHP:
                    if (this.IsSelf(target)) {
                        this._hpProgress.max = target.mhp;
                        this._hpProgress.value = target.hp;
                    }
                    break;
                case Attribute_1.EAttr.MP:
                case Attribute_1.EAttr.MMP:
                    if (this.IsSelf(target)) {
                        const skill0 = this._skillBtn0.data;
                        this._skillBtn0.getChild("icon").grayed = target.mp < skill0.mpCost;
                        this._skillBtn0.touchable = target.mp >= skill0.mpCost;
                        this._skill0Progress.max = skill0.mpCost;
                        this._skill0Progress.value = target.mp;
                        const skill1 = this._skillBtn1.data;
                        this._skillBtn1.getChild("icon").grayed = target.mp < skill1.mpCost;
                        this._skillBtn1.touchable = target.mp >= skill1.mpCost;
                        this._skill1Progress.max = skill1.mpCost;
                        this._skill1Progress.value = target.mp;
                    }
                    break;
            }
        }
        OnGladiatorTimeChange(e) {
            const tf = this._timeList.getChildAt(e.team).asCom.getChild("time").asTextField;
            const t = e.v0 < 0 ? 0 : e.v0;
            tf.text = "" + Math.floor(t * 0.001);
        }
        IsSelf(champion) {
            return champion.rid.equals(Global_1.Global.battleManager.playerID);
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
        OnKeyDown(e) {
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
            if (MathUtils_1.MathUtils.Approximately(this._keyInput.x, this._lastKeyInput.x) &&
                MathUtils_1.MathUtils.Approximately(this._keyInput.y, this._lastKeyInput.y))
                return;
            this._lastKeyInput.CopyFrom(this._keyInput);
            this._keyInput.NormalizeSafe();
            this._frameActionManager.SetInputDirection(this._keyInput);
        }
        OnKeyUp(e) {
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
            if (MathUtils_1.MathUtils.Approximately(this._keyInput.x, this._lastKeyInput.x) &&
                MathUtils_1.MathUtils.Approximately(this._keyInput.y, this._lastKeyInput.y))
                return;
            this._lastKeyInput.CopyFrom(this._keyInput);
            this._keyInput.NormalizeSafe();
            this._frameActionManager.SetInputDirection(this._keyInput);
        }
    }
    exports.UIBattle = UIBattle;
});
//# sourceMappingURL=UIBattle.js.map