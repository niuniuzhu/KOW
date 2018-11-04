var InputFlag;
(function (InputFlag) {
    InputFlag[InputFlag["None"] = 0] = "None";
    InputFlag[InputFlag["Move"] = 1] = "Move";
    InputFlag[InputFlag["Skill1"] = 2] = "Skill1";
    InputFlag[InputFlag["Skill2"] = 4] = "Skill2";
})(InputFlag || (InputFlag = {}));
export class FrameAction {
    constructor(frame) {
        this._frame = frame;
    }
    get frame() { return this._frame; }
    get gcNID() { return this._gcNID; }
    get inputFlag() { return this._inputFlag; }
    get dx() { return this._dx; }
    get dy() { return this._dy; }
    DeSerialize(reader) {
        this._gcNID = reader.uint64();
        this._inputFlag = reader.int32();
        if ((this.inputFlag & InputFlag.Move) > 0) {
            this._dx = reader.float();
            this._dy = reader.float();
        }
    }
}
FrameAction.InputFlag = InputFlag;
