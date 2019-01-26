import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { FMathUtils } from "../RC/FMath/FMathUtils";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { SyncEvent } from "./BattleEvent/SyncEvent";
import { UIEvent } from "./BattleEvent/UIEvent";
import { BattleInfo } from "./BattleInfo";
import { Battle } from "./Logic/Battle";
import { FrameActionGroup } from "./Logic/FrameActionGroup";
import { VBattle } from "./View/VBattle";

interface IMessageInfo {
	message: any;
	handler: (message: any) => void;
}

/**
 * 战场管理器
 */
export class BattleManager {
	private _playerID: Long;
	private readonly _lBattle: Battle;
	private readonly _vBattle: VBattle;
	private _finished: boolean;
	private _ready: boolean;
	private _destroied: boolean;
	/**
	 * 消息队列
	 * 由于在某些情况下无法收到消息马上处理(例如在载入恢复快照和追帧前收到的消息就不能马上处理)
	 * 这里必须把消息放进缓冲队列,等待适当时机调用
	 */
	private readonly _messageQueue: IMessageInfo[] = [];

	/**
	 * 主控ID
	 */
	public get playerID(): Long { return this._playerID; }
	/**
	 * 逻辑战场
	 */
	public get lBattle(): Battle { return this._lBattle; }
	/**
	 * 表现战场
	 */
	public get vBattle(): VBattle { return this._vBattle; }
	/**
	 * 标记是否已结束战场
	 */
	public get finished(): boolean { return this._finished; }
	/**
	 * 标记资源,快照,追帧已经完成
	 */
	public get ready(): boolean { return this._ready; }
	/**
	 * 标记战场是否销毁
	 */
	public get destroied(): boolean { return this._destroied; }

	constructor() {
		this._lBattle = new Battle();
		this._vBattle = new VBattle();
	}

	public Destroy() {
		if (this._destroied)
			return;

		this._finished = true;
		this._ready = false;
		this._destroied = true;

		Global.connector.bsConnector.onclose = null;
		Global.connector.bsConnector.onerror = null;
		Global.connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
		Global.connector.RemoveListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
		Global.connector.RemoveListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));

		this._lBattle.Destroy();
		this._vBattle.Destroy();
		this._messageQueue.splice(0);
	}

	/**
	 * 在连接BS前就监听消息,由于一连接到BS就可能马上收到消息
	 */
	public Init(): void {
		this._finished = false;
		this._ready = false;
		this._destroied = false;
		Global.connector.bsConnector.onclose = this.HandleBSLost.bind(this);
		Global.connector.bsConnector.onerror = this.HandleBSLost.bind(this);
		Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_OutOfSync, this.HandleOutOfSync.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));
	}

	/**
	 * 资源加载前调用
	 */
	public Preload(battleInfo: BattleInfo, caller: any, onComplete: () => void, onProgress: (p: number) => void): void {
		this._vBattle.Preload(battleInfo, caller, onComplete, onProgress);
	}

	/**
	 * 设置战场信息,资源加载后调用
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo, completeHandler: () => void): void {
		this._playerID = battleInfo.playerID;
		this._vBattle.SetBattleInfo(battleInfo);
		this._lBattle.SetBattleInfo(battleInfo);

		const serverFrame = battleInfo.serverFrame;
		const playerInfos = battleInfo.playerInfos;
		//请求最新战场快照
		this.RequestSnapshot(serverFrame, success => {
			if (this._destroied)
				return;
			if (!success) {
				//如果没有快照,则创建初始战场状态
				this._lBattle.CreatePlayers(playerInfos);
			}
			//请求帧行为历史记录
			const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
			request.from = this._lBattle.frame;
			request.to = serverFrame;
			Global.connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
				if (this._destroied)
					return;
				const ret = <Protos.BS2GC_RequestFrameActionsRet>msg;
				//处理历史记录
				const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
				//开始追帧
				if (frameActionGroups != null) {
					//标记追帧状态
					this._lBattle.chase = true;
					//追赶服务端帧数
					this._lBattle.Chase(frameActionGroups);
					this._lBattle.chase = false;
				}
				//同步到表现层
				this._lBattle.SyncInitToView();

				this._ready = true;
				Logger.Log("battle inited");
				//回调函数
				completeHandler();
			});
		});
	}

	/**
	 * 请求快照
	 */
	private RequestSnapshot(serverFrame: number, callback: (success: boolean) => void): void {
		const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
		requestState.frame = serverFrame;
		Global.connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
			const ret = <Protos.BS2GC_RequestSnapshotRet>msg;
			if (ret.snapshot.length == 0) {//没有数据,说明没有快照
				callback(false);
			}
			else {
				this._lBattle.HandleSnapShot(ret);
				callback(true);
			}
		});
	}

	public Update(dt: number): void {
		if (!this._ready)
			return;
		this.ProcessMessageQueue();
		this._lBattle.Update(FMathUtils.ToFixed(dt));
		SyncEvent.Update();
		this._vBattle.Update(dt);
	}

	private QueueMessage(message: any, handler: (message: any) => void): void {
		this._messageQueue.push({ message: message, handler: handler });
	}

	private ProcessMessageQueue(): void {
		for (const messageInfo of this._messageQueue) {
			messageInfo.handler(messageInfo.message);
		}
		this._messageQueue.splice(0);
	}

	/**
	 * 处理服务端回应的帧行为历史记录
	 * @param frames 帧数列表
	 * @param actions 帧行为列表
	 */
	private HandleRequestFrameActions(frames: number[], actions: Uint8Array[]): FrameActionGroup[] {
		const count = frames.length;
		if (count == 0)
			return null;
		const frameActionGroups: FrameActionGroup[] = [];
		for (let i = 0; i < count; ++i) {
			const frameActionGroup = new FrameActionGroup(frames[i]);
			frameActionGroup.Deserialize(actions[i]);
			frameActionGroups.push(frameActionGroup);
		}
		return frameActionGroups;
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param message 协议
	 */
	private HandleFrameAction(message: any): void {
		this.QueueMessage(message, msg => {
			const frameAction = <Protos.BS2GC_FrameAction>msg;
			this._lBattle.HandleFrameAction(frameAction.frame, frameAction.action);
		});
	}

	/**
	 * 服务端通知发生不同步
	 * @param message 协议
	 */
	private HandleOutOfSync(message: any): void {
		this.QueueMessage(message, msg => {
			const outOfSync = <Protos.BS2GC_OutOfSync>msg;
			this._lBattle.HandleOutOfSync(outOfSync);
		});
	}

	/**
	 * 处理战场结束
	 * @param message 协议
	 */
	private HandleBattleEnd(message: any): void {
		this.QueueMessage(message, msg => {
			const battleEnd = <Protos.CS2GC_BattleEnd>msg;
			this._finished = true;
			UIEvent.EndBattle(battleEnd.win, battleEnd.honour, () => {
				this.Destroy();
				Global.sceneManager.ChangeState(SceneManager.State.Main);
			});
		});
	}

	/**
	 * 处理BS丢失
	 */
	private HandleBSLost(e: Event): void {
		this.QueueMessage(null, msg => {
			//如果战场结束,说明BS是正常断开的,不用处理
			if (this._lBattle.finished) {
				return;
			}
			if (e instanceof CloseEvent) {
				Logger.Log(`bs lost,code:${e.code},reason:${e.reason}`);
			}
			else {
				Logger.Log(`bs error`);
			}
			//断开GS
			if (Global.connector.gsConnector.connected) {
				Global.connector.gsConnector.Close();
			}
		});
	}
}