import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { InputFlag } from "../FrameAction";
import { FVec2 } from "../../RC/FMath/FVec2";
export var InputType;
(function (InputType) {
    InputType[InputType["Move"] = 0] = "Move";
    InputType[InputType["S1"] = 1] = "S1";
    InputType[InputType["S2"] = 2] = "S2";
})(InputType || (InputType = {}));
export class InputAgent {
    constructor() {
        this._inputState = new Map();
        this._inputValue = new Map();
    }
    GetInputState(type) {
        return this._inputState.get(type);
    }
    GetInputValue(type) {
        return this._inputValue.get(type);
    }
    SetFromFrameAction(frameAction) {
        if ((frameAction.inputFlag & InputFlag.Move) > 0) {
            const dx = FMathUtils.ToFixed(frameAction.dx);
            const dy = FMathUtils.ToFixed(frameAction.dy);
            const direction = new FVec2(dx, dy);
            const press = direction.SqrMagnitude() > FMathUtils.EPSILON;
            this._inputState.set(InputType.Move, press);
            this._inputValue.set(InputType.Move, direction);
            this.NotifyChange(InputType.Move, press);
        }
        if ((frameAction.inputFlag & InputFlag.S1) > 0) {
            const s1 = frameAction.press ? 1 : 0;
            this._inputState.set(InputType.S1, frameAction.press);
            this._inputValue.set(InputType.S1, s1);
            this.NotifyChange(InputType.S1, frameAction.press);
        }
        if ((frameAction.inputFlag & InputFlag.S2) > 0) {
            const s2 = frameAction.press ? 1 : 0;
            this._inputState.set(InputType.S2, frameAction.press);
            this._inputValue.set(InputType.S2, s2);
            this.NotifyChange(InputType.S2, frameAction.press);
        }
    }
    NotifyChange(type, press) {
        this.handler(type, press);
    }
    EncodeSnapshot(writer) {
        writer.int32(this._inputState.size);
        this._inputState.forEach((v, k, m) => {
            writer.int32(k).bool(v);
        });
        writer.int32(this._inputValue.size);
        this._inputValue.forEach((v, k, m) => {
            writer.int32(k);
            if (v instanceof FVec2) {
                writer.int32(1);
                writer.double(v.x).double(v.y);
            }
            else {
                writer.int32(0);
                writer.int32(v);
            }
        });
    }
    DecodeSnapshot(reader) {
        let count = reader.int32();
        for (let i = 0; i < count; ++i) {
            this._inputState.set(reader.int32(), reader.bool());
        }
        count = reader.int32();
        for (let i = 0; i < count; ++i) {
            const k = reader.int32();
            const t = reader.int32();
            if (t == 1) {
                this._inputValue.set(k, new FVec2(reader.double(), reader.double()));
            }
            else if (t == 0) {
                this._inputValue.set(k, reader.int32());
            }
        }
    }
}
