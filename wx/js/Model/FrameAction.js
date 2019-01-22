import * as Long from "../Libs/long";
export var InputFlag;
(function (InputFlag) {
    InputFlag[InputFlag["None"] = 0] = "None";
    InputFlag[InputFlag["Move"] = 1] = "Move";
    InputFlag[InputFlag["S1"] = 2] = "S1";
    InputFlag[InputFlag["S2"] = 4] = "S2";
})(InputFlag || (InputFlag = {}));
export class FrameInfo {
    get frame() { return this._frame; }
    get inputFlag() { return this._inputFlag; }
    get v0() { return this._v0; }
    get v1() { return this._v1; }
    Deserialize(buffer) {
        this._frame = buffer.ReadInt();
        this._inputFlag = buffer.ReadByte();
        if ((this.inputFlag & InputFlag.Move) > 0) {
            this._v0 = buffer.ReadInt() * 0.001;
            this._v1 = buffer.ReadInt() * 0.001;
        }
        if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
            this._v0 = buffer.ReadInt() * 0.001;
        }
    }
}
export class FrameAction {
    constructor() {
        this._infos = [];
    }
    get gcNID() { return this._gcNID; }
    get infos() { return this._infos; }
    Deserialize(buffer) {
        const low = buffer.ReadInt();
        const high = buffer.ReadInt();
        this._gcNID = Long.fromBits(low, high, true);
        const count = buffer.ReadByte();
        for (let i = 0; i < count; ++i) {
            const info = new FrameInfo();
            info.Deserialize(buffer);
            this._infos.push(info);
        }
    }
}
