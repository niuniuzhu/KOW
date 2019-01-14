import { Hashtable } from "../../RC/Utils/Hashtable";
import { CDefs } from "../CDefs";
import { VEntity } from "./VEntity";
export class VEffect extends VEntity {
    get lifeTime() { return this._lifeTime; }
    constructor(battle, id) {
        super(battle);
        this._id = id;
        this.LoadDefs();
    }
    BeforeLoadDefs() {
        return CDefs.GetEffect(this._id);
    }
    AfterLoadDefs(cdefs) {
        this._animationID = Hashtable.GetNumber(cdefs, "animation");
        const setting = this._animationProxy.GetSetting(this._animationID);
        this._lifeTime = setting.length * setting.interval;
    }
    Update(dt) {
        if (this._lifeTime >= 0 && this._time >= this._lifeTime) {
            this.markToDestroy = true;
        }
        if (!this.markToDestroy) {
            this._time += dt;
        }
    }
    OnSpawn() {
        this._time = 0;
        this.markToDestroy = false;
        this.DisplayRoot();
        this._animationProxy.Play(this._animationID, 0, 1, true);
    }
    OnDespawn() {
        this._root.removeFromParent();
    }
}
