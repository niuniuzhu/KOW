define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FrameActionGroup {
        constructor(frame) {
            this._frameActions = [];
            this._frame = frame;
        }
        get frame() { return this._frame; }
        get numActions() { return this._frameActions.length; }
        Add(frameAction) {
            this._frameActions.push(frameAction);
        }
        Get(index) {
            return this._frameActions[index];
        }
    }
    exports.FrameActionGroup = FrameActionGroup;
});
//# sourceMappingURL=FrameActionGroup.js.map