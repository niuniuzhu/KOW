import { FrameAction } from "./FrameAction";
import { ByteBuffer } from "../RC/Utils/ByteBuffer";
export class FrameActionGroup {
    constructor(frame) {
        this._frameActions = [];
        this._frame = frame;
    }
    get frame() { return this._frame; }
    get numActions() { return this._frameActions.length; }
    Deserialize(data) {
        const buffer = new ByteBuffer(data, ByteBuffer.Endian.Little);
        const count = buffer.ReadByte();
        for (let i = 0; i < count; ++i) {
            const frameAction = new FrameAction();
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
