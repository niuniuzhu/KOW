define(["require", "exports", "./FrameAction"], function (require, exports, FrameAction_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FrameActionGroup {
        constructor(frame) {
            this._frameActions = [];
            this._frame = frame;
        }
        get frame() { return this._frame; }
        get numActions() { return this._frameActions.length; }
        DeSerialize(data) {
            const buffer = new ByteBuffer();
            buffer.littleEndian = true;
            buffer.append(data);
            buffer.offset = 0;
            const count = buffer.readByte();
            for (let i = 0; i < count; ++i) {
                const frameAction = new FrameAction_1.FrameAction();
                frameAction.DeSerialize(buffer);
                this.Add(frameAction);
            }
        }
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