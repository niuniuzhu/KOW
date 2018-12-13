import { FrameAction } from "./FrameAction";

export class FrameActionGroup {
	private readonly _frame;
	private readonly _frameActions: FrameAction[] = [];

	public get frame(): number { return this._frame; }
	public get numActions(): number { return this._frameActions.length; }

	constructor(frame: Number) {
		this._frame = frame;
	}

	public DeSerialize(data: Uint8Array): void {
		const buffer = new ByteBuffer();
		buffer.littleEndian = true;
		buffer.append(data);
		buffer.offset = 0;
		const count = buffer.readByte();
		for (let i = 0; i < count; ++i) {
			const frameAction = new FrameAction();
			frameAction.DeSerialize(buffer);
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