import { VBattle } from "./View/VBattle";
import { Battle } from "./Logic/Battle";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { SceneManager } from "../Scene/SceneManager";
import { BattleInfo } from "./BattleInfo";

/**
 * 战场管理器
 */
export class BattleManager {
	private static _instance: BattleManager;
	/**
	 * 获取单例
	 */
	public static get instance(): BattleManager {
		if (this._instance == null)
			this._instance = new BattleManager();
		return this._instance;
	}

	/**
	 * 每帧追帧上限
	 */
	private static readonly MAX_FRAME_CHASE:number = 10;

	/**
	 * 逻辑战场
	 */
	private _lBattle: Battle;
	/**
	 * 表现战场
	 */
	private _vBattle: VBattle;
	private _init: boolean;

	/**
	 * 构造函数
	 */
	constructor() {
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_Action, this.OnFrameAction.bind(this));
		Connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_BattleEnd, this.OnBattleEnd.bind(this));

		this._lBattle = new Battle();
		this._vBattle = new VBattle();
	}

	/**
	 * 初始化
	 * @param battleInfo 战场信息
	 */
	public Init(battleInfo: BattleInfo): void {
		this._lBattle.Init(battleInfo);
		this._vBattle.Init(battleInfo);
		this._init = true;
		Logger.Log("battle start");
	}

	/**
	 * 清理战场
	 */
	public Clear(): void {
		this._init = false;
		this._lBattle.Clear();
		this._vBattle.Clear();
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
		let battleEnd = <Protos.BS2GC_BattleEnd>message;
		Logger.Log("battle end");
		SceneManager.ChangeState(SceneManager.State.Main);
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param message 协议
	 */
	private OnFrameAction(message: any): void {
		this._lBattle.OnFrameAction(message);
	}
}