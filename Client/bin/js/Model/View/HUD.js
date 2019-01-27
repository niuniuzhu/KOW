define(["require", "exports", "../../Global", "../../RC/Collections/Queue"], function (require, exports, Global_1, Queue_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HUD {
        constructor(owner) {
            this._texts = [];
            this._owner = owner;
            this._root = fairygui.UIPackage.createObject("battle", "HUD").asCom;
            Global_1.Global.graphic.hudRoot.addChild(this._root);
        }
        set name(value) {
            this._root.getChild("n0").asTextField.text = value;
        }
        Destroy() {
            this._root.dispose();
            while (this._texts.length > 0) {
                this._texts[0].Complete();
            }
        }
        Update(dt) {
            this._root.setXY(this._owner.position.x, this._owner.position.y + this._owner.hudOffsetY);
        }
        PopText(type, value) {
            const popText = PopText.Pop();
            this._texts.push(popText);
            popText.onComplete = () => this._texts.splice(this._texts.indexOf(popText), 1);
            popText.Show(type, value, this._owner.position.x, this._owner.position.y);
        }
    }
    exports.HUD = HUD;
    var PopTextType;
    (function (PopTextType) {
        PopTextType[PopTextType["Hurt"] = 0] = "Hurt";
        PopTextType[PopTextType["Heal"] = 1] = "Heal";
    })(PopTextType = exports.PopTextType || (exports.PopTextType = {}));
    class PopText {
        constructor() {
            this._hurt = fairygui.UIPackage.createObject("battle", "hurt_text").asCom;
            this._heal = fairygui.UIPackage.createObject("battle", "heal_text").asCom;
        }
        static Pop() {
            if (this.POOL.size() == 0)
                return new PopText();
            return this.POOL.dequeue();
        }
        static Push(element) {
            this.POOL.enqueue(element);
        }
        Show(type, value, x, y) {
            let str;
            switch (type) {
                case PopTextType.Hurt:
                    this._root = this._hurt;
                    str = "-" + value;
                    break;
                case PopTextType.Heal:
                    this._root = this._heal;
                    str = "+" + value;
                    break;
            }
            Global_1.Global.graphic.hudRoot.addChild(this._root);
            this._root.setXY(x, y);
            this._root.getChild("n0").asTextField.text = str;
            this._root.getTransition("t0").play(laya.utils.Handler.create(this, this.OnTransitionComplete), 1, 0, 0, -1);
        }
        Complete() {
            this._root.getTransition("t0").stop(false, true);
        }
        OnTransitionComplete() {
            if (this.onComplete != null) {
                this.onComplete();
            }
            Global_1.Global.graphic.hudRoot.removeChild(this._root);
            this._root = null;
            this.onComplete = null;
            PopText.Push(this);
        }
    }
    PopText.POOL = new Queue_1.default();
});
//# sourceMappingURL=HUD.js.map