import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { BattleInfo } from "../Model/BattleInfo";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { UILoading } from "../UI/UILoading";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";

/**
 * 加载资源状态
 */
export class LoadingState extends SceneState {
	private readonly _ui: UILoading;
	private readonly _battleInfo: BattleInfo;

	/**
	 * 构造函数
	 */
	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.loading;
		this._battleInfo = new BattleInfo();

	}

	/**
	 * 连接到BS
	 * @param gcNID 客户端网络ID
	 * @param ip BS IP
	 * @param port BS port
	 */
	public ConnectToBS(gcNID: Long, ip: string, port: number) {
		const connector = Global.connector.bsConnector;
		connector.onopen = () => {
			Logger.Log("BS Connected");
			const askLogin = ProtoCreator.Q_GC2BS_AskLogin();
			askLogin.sessionID = gcNID;
			//请求登陆BS
			connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
				const resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
				this._ui.OnLoginBSResut(resp.result, () => Global.sceneManager.ChangeState(SceneManager.State.Login));

				switch (resp.result) {
					case Protos.Global.ECommon.Success:
						//把数据保存,加载资源后用于创建战场
						this._battleInfo.playerID = resp.playerID;
						this._battleInfo.rndSeed = resp.rndSeed;
						this._battleInfo.frameRate = resp.frameRate;
						this._battleInfo.keyframeStep = resp.keyframeStep;
						this._battleInfo.snapshotStep = resp.snapshotStep;
						this._battleInfo.battleTime = resp.battleTime;
						this._battleInfo.mapID = resp.mapID;
						this._battleInfo.playerInfos = resp.playerInfos;
						this._battleInfo.serverFrame = resp.curFrame;

						//战场开始,预加载资源
						Global.battleManager.Start(this._battleInfo, this, () => {
							this._ui.OnLoadComplete();
							//资源预加载后调用
							Global.battleManager.SetBattleInfo(this._battleInfo, () => {
								Global.sceneManager.ChangeState(SceneManager.State.Battle, this._battleInfo);
							});
						}, p => {
							this._ui.OnLoadProgress(p);
						});
						break;
				}
			});
		}
		if (Global.local) {
			connector.Connect("localhost", port);
		} else {
			connector.Connect(ip, port);
		}
	}
}