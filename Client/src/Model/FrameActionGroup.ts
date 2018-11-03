import { FrameAction } from "./FrameAction";

export class FrameActionGroup {
	private readonly _frame;
	private readonly _frameActions: FrameAction[] = [];

	public get frame(): number { return this._frame; }
	public get numActions(): number { return this._frameActions.length; }

	constructor(frame: Number) {
		this._frame = frame;
	}

	public Add(frameAction: FrameAction): void {
		this._frameActions.push(frameAction);
	}

	public Get(index: number): FrameAction {
		return this._frameActions[index];
	}
}