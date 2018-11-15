import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { BattleInfo } from "./BattleInfo";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Global } from "../Global";

/**
 * 战场管理器
 */
export class BattleManager {
	/**
	 * 逻辑战场
	 */
	private _lBattle: Battle;
	/**
	 * 表现战场
	 */
	private _vBattle: VBattle;
	private _init: boolean;

	public get lBattle(): Battle { return this._lBattle; }
	public get vBattle(): VBattle { return this._vBattle; }

	/**
	 * 初始化
	 */
	public Init() {
		Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.OnFrameAction.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));

		this._lBattle = new Battle();
		this._vBattle = new VBattle();
	}

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo, completeHandler: () => void): void {
		this._lBattle.Init(battleInfo);
		this._vBattle.Init(battleInfo);
		this._init = true;

		//请求帧行为历史记录
		const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
		request.from = this._lBattle.frame;
		request.to = battleInfo.serverFrame;
		Global.connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
			const ret = <Protos.BS2GC_RequestFrameActionsRet>msg;
			//处理历史记录
			this.HandleRequestFrameActionsRet(ret.frames, ret.actions);
			Logger.Log("battle start");
			//追赶服务端帧数
			this._lBattle.Chase(false);
			//同步到表现层
			this._lBattle.SyncToView();
			//回调函数
			completeHandler();
		});
	}

	public Update(dt: number): void {
		if (!this._init)
			return;
		this._lBattle.Update(dt);
		this._vBattle.Update(dt);
	}

	/**
	 * 战场结束回调
	 * @param message 协议
	 */
	private OnBattleEnd(message: any): void {
		const battleEnd = <Protos.BS2GC_BattleEnd>message;
		this._lBattle.End();
		this._vBattle.End();
		this._init = false;
		Logger.Log("battle end");
		Global.sceneManager.ChangeState(SceneManager.State.Main);
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param message 协议
	 */
	private OnFrameAction(message: any): void {
		const frameAction = <Protos.BS2GC_FrameAction>message;
		this._lBattle.OnFrameAction(frameAction.frame, frameAction.action);
	}

	/**
	 * 处理服务端回应的帧行为历史记录
	 * @param frames 帧数列表
	 * @param actions 帧行为列表
	 */
	private HandleRequestFrameActionsRet(frames: number[], actions: Uint8Array[]): any {
		const count = frames.length;
		for (let i = 0; i < count; ++i) {
			this._lBattle.OnFrameAction(frames[i], actions[i]);
		}
	}
}