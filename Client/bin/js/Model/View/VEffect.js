define(["require", "exports", "../../RC/Utils/Hashtable", "../CDefs", "./VEntity"], function (require, exports, Hashtable_1, CDefs_1, VEntity_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class VEffect extends VEntity_1.VEntity {
        get lifeTime() { return this._lifeTime; }
        constructor(battle, id) {
            super(battle);
            this._id = id;
            this.LoadDefs();
        }
        BeforeLoadDefs() {
            return CDefs_1.CDefs.GetEffect(this._id);
        }
        AfterLoadDefs(cdefs) {
            this._animationID = Hashtable_1.Hashtable.GetNumber(cdefs, "animation");
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
    exports.VEffect = VEffect;
});
//# sourceMappingURL=VEffect.js.map