import { Consts } from "../Consts";
import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Vec2 } from "../RC/Math/Vec2";
import { Timer } from "../RC/Utils/Timer";

enum InputFlag {
	None = 0,
	Move = 1 << 0,
	S1 = 1 << 1,
	S2 = 1 << 2,
}

export class FrameAciontManager {
	private static readonly MAX_ACTIONS = 16;
	public static readonly InputFlag = InputFlag;

	private readonly _infos: Protos.GC2BS_FrameActionInfo[] = []

	private _nextFrameActionSendTime: number = 0;

	public Reset(): void {
		this._nextFrameActionSendTime = 0;
		this._infos.splice(0);
	}

	public SetInputDirection(direction: Vec2): void {
		if (this._infos.length == FrameAciontManager.MAX_ACTIONS)
			return;
		const info = new Protos.GC2BS_FrameActionInfo();
		info.frame = 0;//todo
		info.inputFlag = InputFlag.Move;
		info.v0 = direction.x;
		info.v1 = direction.y;
		this._infos.push(info);
	}

	public SetS1(press: boolean): void {
		if (this._infos.length == FrameAciontManager.MAX_ACTIONS)
			return;
		const info = new Protos.GC2BS_FrameActionInfo();
		info.frame = 0;//todo
		info.inputFlag = InputFlag.S1;
		info.v0 = press ? 1 : 0;
		this._infos.push(info);
	}

	public SetS2(press: boolean): void {
		if (this._infos.length == FrameAciontManager.MAX_ACTIONS)
			return;
		const info = new Protos.GC2BS_FrameActionInfo();
		info.frame = 0;//todo
		info.inputFlag = InputFlag.S2;
		info.v0 = press ? 1 : 0;
		this._infos.push(info);
	}

	public Update(dt: number): void {
		if (this._infos.length > 0 && Timer.utcTime >= this._nextFrameActionSendTime) {
			this._nextFrameActionSendTime = Timer.utcTime + Consts.FRAME_ACTION_SEND_INTERVAL;
			const frameAction = ProtoCreator.Q_GC2BS_FrameAction();
			const count = this._infos.length;
			for (let i = 0; i < count; ++i) {
				frameAction.infos.push(this._infos[i]);
			}
			Global.connector.bsConnector.Send(Protos.GC2BS_FrameAction, frameAction);
			this.Reset();
		}
	}
}