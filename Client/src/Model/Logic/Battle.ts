import { Protos } from "../../Libs/protos";

export class Battle {
	private _frameRate: number;
	private _keyframeStep: number;
	private _timeout: number;
	private _mapID: number;
	private _frame: number;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }

	private _msPerFrame:number;
	private _elapsed:number;

	public Init(loginRet: Protos.BS2GC_LoginRet): void {
		this._frameRate = loginRet.frameRate;
		this._keyframeStep = loginRet.keyframeStep;
		this._timeout = loginRet.battleTime;
		this._mapID = loginRet.mapID

		this._msPerFrame = 1000 / this._frameRate;
	}

	public Clear():void{
		this._frame = 0;
	}

	public Update(dt: number): void {
		this._elapsed += dt;
		// while (this._elapsed >= this._msPerFrame) {
		// 	this._elapsed -= this._msPerFrame;

		// 	if (this._frame % this.keyframeStep == 0)
		// 		this._battle.OnKeyframe(this._frame, this._msPerFrame);

		// 	this._battle.UpdateLogic(this._frame, this._msPerFrame);

		// 	++this._frame;
		// }
	}
}