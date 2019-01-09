import { AssetsManager, AssetType } from "../AssetsManager";
import { Consts } from "../Consts";
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
		connector.onerror = (e) => this._ui.OnConnectToBSError(e, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
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
						Global.battleManager.Start();
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
						//预加载资源
						this.LoadAssets(this._battleInfo);
						break;
				}
			});
		}
		if (Global.platform == Global.Platform.Editor) {
			connector.Connect("localhost", port);
		}
		else {
			connector.Connect(ip, port);
		}
	}

	/**
	 * 读取资源载入内存
	 */
	private LoadAssets(battleInfo: BattleInfo): void {
		const urls = [];
		const count = battleInfo.playerInfos.length;
		for (let i = 0; i < count; ++i) {
			const playerInfo = battleInfo.playerInfos[i];
			//压入角色资源
			urls.push({ url: "res/roles/" + Consts.ASSETS_ENTITY_PREFIX + playerInfo.actorID + ".atlas", type: AssetType.Atlas });
		}

		//压入地图资源
		urls.push({ url: "res/ui/assets.bin", type: AssetType.Binary });
		urls.push({ url: "res/ui/assets_atlas0.png", type: AssetType.Image });
		AssetsManager.LoadBatch(urls, this, () => {
			this._ui.OnLoadComplete();
			fairygui.UIPackage.addPackage("res/ui/assets");
			this.InitBattle();
		}, p => {
			this._ui.OnLoadProgress(p);
		});
	}

	/**
	 * 准备战场环境
	 */
	private InitBattle(): void {
		//初始化战场,解码快照
		Global.battleManager.SetBattleInfo(this._battleInfo, () => {
			Global.sceneManager.ChangeState(SceneManager.State.Battle);
		});
	}
}