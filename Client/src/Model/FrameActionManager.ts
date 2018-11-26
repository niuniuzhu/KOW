import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Vec2 } from "../RC/Math/Vec2";
import { Logger } from "../RC/Utils/Logger";
import { Timer } from "../RC/Utils/Timer";

enum InputFlag {
	None = 0,
	Move = 1 << 0,
	Skill1 = 1 << 1,
	Skill2 = 1 << 2
}

export class FrameAciontManager {
	public static readonly InputFlag = InputFlag;

	public get direction(): Vec2 { return this._direction; }
	public get inputFlag(): InputFlag { return this._inputFlag; }

	private _direction: Vec2 = Vec2.zero;
	private _inputFlag: InputFlag = InputFlag.None;
	private _nextFrameActionSendTime: number = 0;
	private _changed: boolean = false;

	constructor() {
	}

	public Reset(): void {
		this._nextFrameActionSendTime = 0;
		this._direction.Set(0, 0);
		this._inputFlag = InputFlag.None;
	}

	public SetInputDirection(direction: Vec2): void {
		this._direction.CopyFrom(direction);
		this._inputFlag |= InputFlag.Move;
		this._changed = true;
	}

	public SetInputSkill1(): void {
		this._inputFlag |= InputFlag.Skill1;
		this._changed = true;
	}

	public SetInputSkill2(): void {
		this._inputFlag |= InputFlag.Skill2;
		this._changed = true;
	}

	public Update(dt: number): void {
		if (this._changed && Timer.utcTime >= this._nextFrameActionSendTime) {
			this._nextFrameActionSendTime = Timer.utcTime + Consts.FRAME_ACTION_SEND_INTERVAL;
			const frameAction = ProtoCreator.Q_GC2BS_FrameAction();
			frameAction.inputFlag = this.inputFlag;
			frameAction.dx = this.direction.x;
			frameAction.dy = this.direction.y;
			Global.connector.bsConnector.Send(Protos.GC2BS_FrameAction, frameAction);
			this._inputFlag = 0;
			this._changed = false;
		}
	}
}