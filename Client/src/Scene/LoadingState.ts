import { SceneState } from "./SceneState";
import { UILoading } from "../UI/UILoading";
import { BattleInfo } from "../Model/BattleInfo";
import { UIManager } from "../UI/UIManager";
import { Connector } from "../Net/Connector";
import { Protos } from "../Libs/protos";
import { Logger } from "../RC/Utils/Logger";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Env } from "../Env";
import { PreloadInstance } from "./PreloadInstance";

export class LoadingState extends SceneState {
	private readonly _ui: UILoading;
	private readonly _battleInfo: BattleInfo;

	constructor(type: number) {
		super(type);
		this.__ui = this._ui = UIManager.loading;
		this._battleInfo = new BattleInfo();

		Connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
	}

	//cs下发bs的连接信息
	private OnEnterBattle(message: any): void {
		let enterBattle: Protos.CS2GC_EnterBattle = <Protos.CS2GC_EnterBattle>message;
		if (enterBattle.error != Protos.CS2GC_EnterBattle.Error.Success) {
			this._ui.OnEnterBattleResult(enterBattle.error);
		}
		else {
			let connector = Connector.bsConnector;
			connector.onerror = (e) => this._ui.OnConnectToBSError(e);
			connector.onopen = () => {
				Logger.Log("BS Connected");
				let askLogin = ProtoCreator.Q_GC2BS_AskLogin();
				askLogin.sessionID = enterBattle.gcNID;
				//请求登陆BS
				connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
					let resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
					this._ui.OnLoginBSResut(resp.result);
					
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
			if (Env.platform == Env.Platform.Editor) {
				connector.Connect("localhost", enterBattle.port);
			}
			else {
				connector.Connect(enterBattle.ip, enterBattle.port);
			}
		}
	}

	private RequestSnapshot(): void {
		let requestState = ProtoCreator.Q_GC2BS_RequestSnapshot();
		requestState.frame = 0;
		Connector.SendToBS(Protos.GC2BS_RequestSnapshot, requestState, msg => {
			let ret = <Protos.BS2GC_RequestSnapshotRet>msg;
			this._battleInfo.reqFrame = ret.reqFrame;
			this._battleInfo.curFrame = ret.curFrame;
			//解码快照

			//开始加载资源
			this.StartLoad(resp);
		});
	}

	private StartLoad(): void {
		//todo preloadall
		Logger.Log("instancing");
		PreloadInstance.Load(mapID, playerInfos, this.OnInstancingComplete);
	}

	//通知cs加载完成
	public OnInstancingComplete(): void {
		Logger.Log("instancing complete");
		let msg = ProtoCreator.Q_GC2CS_UpdatePlayerInfo();
		msg.progress = 100;
		Connector.SendToCS(Protos.GC2CS_UpdatePlayerInfo, msg);
	}
}