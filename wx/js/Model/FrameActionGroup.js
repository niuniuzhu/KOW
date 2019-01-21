"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ByteBuffer_1 = require("../RC/Utils/ByteBuffer");
const FrameAction_1 = require("./FrameAction");
class FrameActionGroup {
    constructor(frame) {
        this._frameActions = [];
        this._frame = frame;
    }
    get frame() { return this._frame; }
    get numActions() { return this._frameActions.length; }
    Deserialize(data) {
        const buffer = new ByteBuffer_1.ByteBuffer(data, ByteBuffer_1.ByteBuffer.Endian.Little);
        const count = buffer.ReadByte();
        for (let i = 0; i < count; ++i) {
            const frameAction = new FrameAction_1.FrameAction();
            frameAction.Deserialize(buffer);
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
