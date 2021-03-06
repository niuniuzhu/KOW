define(["require", "exports", "../../RC/FMath/FMathUtils", "./FrameAction", "../../RC/FMath/FVec2"], function (require, exports, FMathUtils_1, FrameAction_1, FVec2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var InputType;
    (function (InputType) {
        InputType[InputType["Move"] = 0] = "Move";
        InputType[InputType["S1"] = 1] = "S1";
        InputType[InputType["S2"] = 2] = "S2";
    })(InputType = exports.InputType || (exports.InputType = {}));
    class InputAgent {
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
            for (const info of frameAction.infos) {
                if ((info.inputFlag & FrameAction_1.InputFlag.Move) > 0) {
                    const v0 = FMathUtils_1.FMathUtils.ToFixed(info.v0);
                    const v1 = FMathUtils_1.FMathUtils.ToFixed(info.v1);
                    const direction = new FVec2_1.FVec2(v0, v1);
                    const press = direction.SqrMagnitude() > FMathUtils_1.FMathUtils.EPSILON;
                    this._inputState.set(InputType.Move, press);
                    this._inputValue.set(InputType.Move, direction);
                    this.NotifyChange(InputType.Move, press);
                }
                if ((info.inputFlag & FrameAction_1.InputFlag.S1) > 0) {
                    const s1 = info.v0;
                    const press = s1 > 0 ? true : false;
                    this._inputState.set(InputType.S1, press);
                    this._inputValue.set(InputType.S1, s1);
                    this.NotifyChange(InputType.S1, press);
                }
                if ((info.inputFlag & FrameAction_1.InputFlag.S2) > 0) {
                    const s2 = info.v0;
                    const press = s2 > 0 ? true : false;
                    this._inputState.set(InputType.S2, press);
                    this._inputValue.set(InputType.S2, s2);
                    this.NotifyChange(InputType.S2, press);
                }
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
                if (v instanceof FVec2_1.FVec2) {
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
                    this._inputValue.set(k, new FVec2_1.FVec2(reader.double(), reader.double()));
                }
                else if (t == 0) {
                    this._inputValue.set(k, reader.int32());
                }
            }
        }
    }
    exports.InputAgent = InputAgent;
});
//# sourceMappingURL=InputAagent.js.map