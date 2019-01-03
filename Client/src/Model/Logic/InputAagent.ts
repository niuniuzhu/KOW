import * as $protobuf from "../../Libs/protobufjs";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FrameAction, InputFlag } from "../FrameAction";
import { ISnapshotable } from "../ISnapshotable";
import { FVec2 } from "../../RC/FMath/FVec2";

export enum InputType {
	Move,
	S1,
	S2
}

export class InputAgent implements ISnapshotable {
	public handler: (type: InputType, press: boolean) => void;

	private readonly _inputState = new Map<InputType, boolean>();
	private readonly _inputValue = new Map<InputType, any>();

	public GetInputState(type: InputType): boolean {
		return this._inputState.get(type);
	}

	public GetInputValue(type: InputType): any {
		return this._inputValue.get(type);
	}

	public SetFromFrameAction(frameAction: FrameAction): void {
		for (const info of frameAction.infos) {
			if ((info.inputFlag & InputFlag.Move) > 0) {
				const v0 = FMathUtils.ToFixed(info.v0);
				const v1 = FMathUtils.ToFixed(info.v1);
				const direction = new FVec2(v0, v1);
				const press = direction.SqrMagnitude() > FMathUtils.EPSILON;
				this._inputState.set(InputType.Move, press);
				this._inputValue.set(InputType.Move, direction);
				this.NotifyChange(InputType.Move, press);
			}
			if ((info.inputFlag & InputFlag.S1) > 0) {
				const s1 = info.v0;
				const press = s1 > 0 ? true : false;
				this._inputState.set(InputType.S1, press);
				this._inputValue.set(InputType.S1, s1);
				this.NotifyChange(InputType.S1, press);
			}
			if ((info.inputFlag & InputFlag.S2) > 0) {
				const s2 = info.v0;
				const press = s2 > 0 ? true : false;
				this._inputState.set(InputType.S2, press);
				this._inputValue.set(InputType.S2, s2);
				this.NotifyChange(InputType.S2, press);
			}
		}
	}

	private NotifyChange(type: InputType, press: boolean): void {
		this.handler(type, press);
	}

	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._inputState.size);
		this._inputState.forEach((v, k, m) => {
			writer.int32(k).bool(v);
		});

		//type:0-int32,1-FVec2...
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

	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		let count = reader.int32();
		for (let i = 0; i < count; ++i) {
			this._inputState.set(reader.int32(), reader.bool());
		}

		count = reader.int32()
		for (let i = 0; i < count; ++i) {
			const k = reader.int32();
			const t = reader.int32();
			if (t == 1) {//FVec2
				this._inputValue.set(k, new FVec2(reader.double(), reader.double()));
			}
			else if (t == 0) {
				this._inputValue.set(k, reader.int32());
			}
		}
	}
} 