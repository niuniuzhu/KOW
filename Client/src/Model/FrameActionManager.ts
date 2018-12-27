import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Vec2 } from "../RC/Math/Vec2";
import { Timer } from "../RC/Utils/Timer";
import { MathUtils } from "../RC/Math/MathUtils";

enum InputFlag {
	None = 0,
	Move = 1 << 0,
	S1 = 1 << 1,
	S2 = 1 << 2,
}

export class FrameAciontManager {
	public static readonly InputFlag = InputFlag;

	public get direction(): Vec2 { return this._direction; }
	public get inputFlag(): InputFlag { return this._inputFlag; }

	private _direction: Vec2 = Vec2.zero;
	private _press: boolean;
	private _inputFlag: InputFlag = InputFlag.None;
	private _nextFrameActionSendTime: number = 0;
	private _changed: boolean = false;

	constructor() {
	}

	public Reset(): void {
		this._nextFrameActionSendTime = 0;
		this._direction.Set(0, 0);
		this._inputFlag = InputFlag.None;
		this._changed = false;
	}

	public SetInputDirection(direction: Vec2): void {
		this._direction.CopyFrom(direction);
		this._inputFlag |= InputFlag.Move;
		this._press = direction.SqrMagnitude() > MathUtils.EPSILON;
		this._changed = true;
	}

	public SetS1(press: boolean): void {
		this._inputFlag |= InputFlag.S1;
		this._press = press;
		this._changed = true;
	}

	public SetS2(press: boolean): void {
		this._inputFlag |= InputFlag.S2;
		this._press = press;
		this._changed = true;
	}

	public Update(dt: number): void {
		if (this._changed && Timer.utcTime >= this._nextFrameActionSendTime) {
			this._nextFrameActionSendTime = Timer.utcTime + Consts.FRAME_ACTION_SEND_INTERVAL;
			const frameAction = ProtoCreator.Q_GC2BS_FrameAction();
			frameAction.inputFlag = this.inputFlag;
			if ((this.inputFlag & InputFlag.Move) > 0) {
				frameAction.dx = this.direction.x;
				frameAction.dy = this.direction.y;
				frameAction.press = this._press;
			}
			if ((this.inputFlag & InputFlag.S1) > 0 || (this.inputFlag & InputFlag.S2) > 0) {
				frameAction.press = this._press;
			}
			Global.connector.bsConnector.Send(Protos.GC2BS_FrameAction, frameAction);
			this.Reset();
		}
	}
}