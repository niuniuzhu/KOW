import { SceneState } from "./SceneState";
import { UILoading } from "../UI/UILoading";
import { BattleInfo } from "../Model/BattleInfo";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Global } from "../Global";
import { SceneManager } from "./SceneManager";

/**
 * 加载资源状态
 */
export class LoadingState extends SceneState {
	private readonly _ui: UILoading;
	private readonly _battleInfo: BattleInfo;
	private _assetsLoadComplete: boolean;

	/**
	 * 构造函数
	 */
	constructor(type: number) {
		super(type);
		this.__ui = this._ui = Global.uiManager.loading;
		this._battleInfo = new BattleInfo();

		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
	}

	/**
	 * 服务端已准备好战场,客户端连接BS获取战场信息,并载入资源,获取快照,初始化战场
	 * @param message 协议
	 */
	private OnEnterBattle(message: any): void {
		const enterBattle: Protos.CS2GC_EnterBattle = <Protos.CS2GC_EnterBattle>message;
		if (enterBattle.error != Protos.CS2GC_EnterBattle.Error.Success) {
			this._ui.OnEnterBattleResult(enterBattle.error, () => Global.sceneManager.ChangeState(SceneManager.State.Login));
		}
		else {
			this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
		}
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
						//把数据保存,加载资源后用于创建战场
						this._battleInfo.rndSeed = resp.rndSeed;
						this._battleInfo.frameRate = resp.frameRate;
						this._battleInfo.keyframeStep = resp.keyframeStep;
						this._battleInfo.battleTime = resp.battleTime;
						this._battleInfo.mapID = resp.mapID;

						//请求快照
						this.RequestSnapshot();
						break;
				}
			});
		}
		//todo 这里最好用kcp连接
		if (Global.platform == Global.Platform.Editor) {
			connector.Connect("localhost", port);
		}
		else {
			connector.Connect(ip, port);
		}
	}

	/**
	 * 请求快照
	 */
	private RequestSnapshot(): void {
		const requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
		requestState.frame = 0;
		Global.connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
			const ret = <Protos.BS2GC_RequestSnapshotRet>msg;
			this._battleInfo.reqFrame = ret.reqFrame;
			this._battleInfo.serverFrame = ret.curFrame;
			this._battleInfo.snapshot = ret.snapshot;
			this.LoadAssets();
		});
	}

	/**
	 * 读取资源载入内存
	 */
	private LoadAssets(): void {
		if (this._assetsLoadComplete) {
			this.InitBattle();
		}
		else {
			const urls = [];
			urls.push({ url: "res/ui/assets.bin", type: Laya.Loader.BUFFER });
			urls.push({ url: "res/ui/assets_atlas0.png", type: Laya.Loader.IMAGE });
			Laya.loader.load(urls, Laya.Handler.create(this, () => {
				fairygui.UIPackage.addPackage("res/ui/assets");
				this._assetsLoadComplete = true;
				this.InitBattle();
			}), new laya.utils.Handler(this, p => {
				this._ui.OnLoadProgress(p);
			}));
		}
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