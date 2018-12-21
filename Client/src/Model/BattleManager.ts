import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { ProtoCreator } from "../Net/ProtoHelper";
import Queue from "../RC/Collections/Queue";
import { FMathUtils } from "../RC/FMath/FMathUtils";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { BattleInfo } from "./BattleInfo";
import { FrameActionGroup } from "./FrameActionGroup";
import { Battle } from "./Logic/Battle";
import { VBattle } from "./View/VBattle";

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
		Global.connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.HandleFrameAction.bind(this));
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.HandleBattleEnd.bind(this));

		this._lBattle = new Battle();
		this._vBattle = new VBattle();
	}

	public Destroy() {
		this._lBattle.Destroy();
		this._vBattle.Destroy();
		this._init = false;
	}

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo, completeHandler: () => void): void {
		this._vBattle.SetBattleInfo(battleInfo);
		this._lBattle.SetBattleInfo(battleInfo);

		const curFrame = battleInfo.serverFrame;
		//请求最新战场快照
		this.RequestSnapshot(success => {
			if (!success) {
				//如果没有快照,则创建初始战场状态
				this._lBattle.CreatePlayers(battleInfo.playerInfos);
			}
			//请求帧行为历史记录
			const request = ProtoCreator.Q_GC2BS_RequestFrameActions();
			request.from = this._lBattle.frame;
			request.to = curFrame;
			Global.connector.SendToBS(Protos.GC2BS_RequestFrameActions, request, msg => {
				const ret = <Protos.BS2GC_RequestFrameActionsRet>msg;
				//处理历史记录
				const frameActionGroups = this.HandleRequestFrameActions(ret.frames, ret.actions);
				//追赶服务端帧数
				this._lBattle.Chase(frameActionGroups, false, false);
				//同步到表现层
				this._lBattle.SyncInitToView();

				this._init = true;
				Logger.Log("battle inited");
				//回调函数
				completeHandler();
			});
		});
	}

	public Update(dt: number): void {
		if (!this._init)
			return;
		this._lBattle.Update(FMathUtils.ToFixed(dt));
		this._vBattle.Update(dt);
	}

	/**
	 * 请求快照
	 */
	private RequestSnapshot(callback: (success: boolean) => void): void {
		const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
		requestState.frame = -1;
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

	/**
	 * 战场结束回调
	 * @param message 协议
	 */
	private HandleBattleEnd(message: any): void {
		Logger.Log("battle end");
		const battleEnd = <Protos.CS2GC_BattleEnd>message;
		this.Destroy();
		Global.sceneManager.ChangeState(SceneManager.State.Main);
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param message 协议
	 */
	private HandleFrameAction(message: any): void {
		const frameAction = <Protos.BS2GC_FrameAction>message;
		this._lBattle.HandleFrameAction(frameAction.frame, frameAction.action);
	}

	/**
	 * 处理服务端回应的帧行为历史记录
	 * @param frames 帧数列表
	 * @param actions 帧行为列表
	 */
	private HandleRequestFrameActions(frames: number[], actions: Uint8Array[]): Queue<FrameActionGroup> {
		const count = frames.length;
		if (count == 0)
			return null;
		const frameActionGroups = new Queue<FrameActionGroup>();
		for (let i = 0; i < count; ++i) {
			const frameActionGroup = new FrameActionGroup(frames[i]);
			frameActionGroup.Deserialize(actions[i]);
			frameActionGroups.enqueue(frameActionGroup);
		}
		return frameActionGroups;
	}
}