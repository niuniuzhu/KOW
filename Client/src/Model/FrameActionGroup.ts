import { ByteBuffer } from "../RC/Utils/ByteBuffer";
import { FrameAction } from "./FrameAction";

export class FrameActionGroup {
	private readonly _frame;
	private readonly _frameActions: FrameAction[] = [];

	public get frame(): number { return this._frame; }
	public get numActions(): number { return this._frameActions.length; }

	constructor(frame: Number) {
		this._frame = frame;
	}

	public Deserialize(data: Uint8Array): void {
		const buffer = new ByteBuffer(data, ByteBuffer.Endian.Little);
		const count = buffer.ReadByte();
		for (let i = 0; i < count; ++i) {
			const frameAction = new FrameAction();
			frameAction.Deserialize(buffer);
			this.Add(frameAction);
		}
	}

	public Add(frameAction: FrameAction): void {
		this._frameActions.push(frameAction);
	}

	public Get(index: number): FrameAction {
		return this._frameActions[index];
	}
}