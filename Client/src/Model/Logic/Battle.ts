import { Protos } from "../../Libs/protos";
import Queue from "../../RC/Collections/Queue";
import { Logger } from "../../RC/Utils/Logger";
import { BattleInfo } from "../BattleInfo";

export class Battle {
	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }

	private _msPerFrame: number = 0;
	private _nextKeyFrame: number = 0;
	private _logicElapsed: number = 0;
	private _realElapsed: number = 0;

	private readonly _frameActions: Queue<Protos.BS2GC_Action> = new Queue<Protos.BS2GC_Action>();

	public Init(battleInfo: BattleInfo): void {
		this._frameRate = battleInfo.frameRate;
		this._keyframeStep = battleInfo.keyframeStep;
		this._timeout = battleInfo.battleTime;
		this._mapID = battleInfo.mapID

		this._msPerFrame = 1000 / this._frameRate;
	}

	public Clear(): void {
		this._frame = 0;
		this._nextKeyFrame = 0;
		this._logicElapsed = 0;
		this._realElapsed = 0;
		this._frameActions.clear();
	}

	public Update(dt: number): void {
		this._realElapsed += dt;
		while (!this._frameActions.isEmpty()) {
			let frameAction = this._frameActions.dequeue();
			let length = frameAction.frame - this.frame;
			while (length >= 0) {
				if (length == 0)
					this.HandleFrameAction(frameAction);
				else {
					this.UpdateLogic(this._realElapsed, this._msPerFrame);
					this._realElapsed = 0;
				}
				--length;
			}
			this._nextKeyFrame = frameAction.frame + this.keyframeStep;
		}

		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed += dt;

			while (this._logicElapsed >= this._msPerFrame) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._realElapsed, this._msPerFrame);

				if (this.frame == this._nextKeyFrame) {
					//todo send action
				}
				this._realElapsed = 0;
				this._logicElapsed -= this._msPerFrame;
			}
		}
	}

	private HandleFrameAction(frameAction: Protos.BS2GC_Action): void {
	}

	private UpdateLogic(rdt: number, dt: number): void {
		Logger.Log("rdt:" + rdt + ",dt:" + dt);
		++this._frame;
	}

	public OnFrameAction(frameAction: Protos.BS2GC_Action): void {
		this._frameActions.enqueue(frameAction);
	}
}