define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AniHolder extends fairygui.GGraph {
        get animation() { return this._animation; }
        constructor(imageUrls) {
            super();
            const roleAni = new Laya.Animation();
            roleAni.autoSize = true;
            roleAni.interval = 100;
            roleAni.loadImages(imageUrls);
            this.setPivot(0.5, 0.5, true);
            this.setNativeObject(roleAni);
            this.setSize(roleAni.width, roleAni.height);
            this._animation = roleAni;
        }
        Play(start, loop, name, showWarn) {
            this._animation.play(start, loop, name, showWarn);
        }
        dispose() {
            this.animation.destroy();
            super.dispose();
        }
    }
    exports.AniHolder = AniHolder;
});
//# sourceMappingURL=AniHolder.js.map