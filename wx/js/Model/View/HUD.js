import { Global } from "../../Global";
import Queue from "../../RC/Collections/Queue";
export class HUD {
    constructor(owner) {
        this._texts = [];
        this._owner = owner;
        this._root = fairygui.UIPackage.createObject("battle", "HUD").asCom;
        Global.graphic.hudRoot.addChild(this._root);
    }
    OnDecodeSync() {
        this._root.getController("c1").selectedIndex = this._owner.self ? 0 : 1;
        this._root.getChild("n0").asTextField.text = this._owner.name;
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
    PopText(value) {
        value = Math.floor(value);
        if (value == 0)
            return;
        const popText = PopText.Pop();
        this._texts.push(popText);
        popText.onComplete = () => this._texts.splice(this._texts.indexOf(popText), 1);
        popText.Show(value, this._owner.position.x, this._owner.position.y);
    }
}
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
    Show(value, x, y) {
        this._root = value > 0 ? this._heal : this._hurt;
        Global.graphic.hudRoot.addChild(this._root);
        this._root.setXY(x, y);
        this._root.getChild("n0").asTextField.text = value > 0 ? "+" + value : "" + value;
        this._root.getTransition("t0").play(laya.utils.Handler.create(this, this.OnTransitionComplete), 1, 0, 0, -1);
    }
    Complete() {
        this._root.getTransition("t0").stop(false, true);
    }
    OnTransitionComplete() {
        if (this.onComplete != null) {
            this.onComplete();
        }
        Global.graphic.hudRoot.removeChild(this._root);
        this._root = null;
        this.onComplete = null;
        PopText.Push(this);
    }
}
PopText.POOL = new Queue();
