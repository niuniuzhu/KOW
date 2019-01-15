import { WSConnector } from "../Net/WSConnector";
import { ProtoCreator } from "../Net/ProtoHelper";
import { Logger } from "../RC/Utils/Logger";
import { Protos } from "../Libs/protos";
import { GUID } from "../RC/Utils/GUID";
import { Connector } from "../Net/Connector";
import { MathUtils } from "../RC/Math/MathUtils";

export class ConnectionTest {
	private _connector: Connector = new Connector();
	private _closeTime: number = 0;
	private _time: number = 0;

	constructor() {
		ProtoCreator.Init();
		this._connector.Init();

		this._connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_EnterBattle, this.OnEnterBattle.bind(this));
		this._connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eCS2GC_BattleEnd, this.OnBattleEnd.bind(this));
		this._connector.AddListener(Connector.ConnectorType.BS, Protos.MsgID.eBS2GC_FrameAction, this.OnFrameAction.bind(this));

		this._closeTime = MathUtils.Random(1000, 3000);
		const name = GUID.create().toString();
		this.Login(name);
	}

	public Update(dt: number): void {
		this._time += dt;
		this._connector.Update(dt);
	}

	private ConnectToLS(connector: WSConnector): void {
		connector.Connect("localhost", 49996);
	}

	private Login(uname: string): void {
		const login = ProtoCreator.Q_GC2LS_AskSmartLogin();
		login.name = uname;

		const connector = new WSConnector();
		connector.onerror = (e) => Logger.Error(e);
		connector.onclose = () => { };
		connector.onopen = () => {
			connector.Send(Protos.GC2LS_AskSmartLogin, login, message => {
				const resp: Protos.LS2GC_AskLoginRet = <Protos.LS2GC_AskLoginRet>message;
				switch (resp.result) {
					case Protos.LS2GC_AskLoginRet.EResult.Success:
						this.HandleLoginLSSuccess(resp);
						break;
					default:
						Logger.Warn("failed:" + resp.result);
						break;
				}
			});
		};
		this.ConnectToLS(connector);
	}

	private HandleLoginLSSuccess(loginResult: Protos.LS2GC_AskLoginRet): void {
		// Logger.Log("gcNID:" + loginResult.sessionID + "login success");
		let gsInfo = loginResult.gsInfos[0];
		this.LoginGS(gsInfo.ip, gsInfo.port, gsInfo.password, loginResult.sessionID);
	}

	private LoginGS(ip: string, port: number, pwd: string, gcNID: Long): void {
		const connector = this._connector.gsConnector;
		connector.onerror = (e) => Logger.Error("gs:" + e);
		connector.Close = () => Logger.Log("gs closed");
		connector.onopen = () => {
			Logger.Log("GS Connected");
			const askLogin = ProtoCreator.Q_GC2GS_AskLogin();
			askLogin.pwd = pwd;
			askLogin.sessionID = gcNID;
			connector.Send(Protos.GC2GS_AskLogin, askLogin, message => {
				const resp: Protos.GS2GC_LoginRet = <Protos.GS2GC_LoginRet>message;
				switch (resp.result) {
					case Protos.GS2GC_LoginRet.EResult.Success:
						if (resp.gcState == Protos.GS2GC_LoginRet.EGCCState.Battle) {
							//玩家处于战场,重新连接到BS
							this.ConnectToBS(resp.gcNID, resp.bsIP, resp.bsPort);
						}
						else {
							this.BeginMatch();
						}
						break;
					default:
						Logger.Warn("failed:" + resp.result);
						break;
				}
			});
		}
		connector.Connect("localhost", port);
	}

	private BeginMatch(): void {
		const beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		beginMatch.actorID = 0;//todo 使用的角色
		//请求CS开始匹配
		this._connector.SendToCS(Protos.GC2CS_BeginMatch, beginMatch, message => {
			const resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			switch (resp.result) {
				case Protos.CS2GC_BeginMatchRet.EResult.Success:
					//开始匹配成功
					//这里不用判断是否满员,下发的房间玩家里不包含自己,会在PlayerJoin消息里通知
					// Logger.Log("begin match");
					break;
				default:
					Logger.Warn("failed:" + resp.result);
					break;
			}
		});
	}

	public ConnectToBS(gcNID: Long, ip: string, port: number) {
		const connector = this._connector.bsConnector;
		connector.onerror = (e) => Logger.Error(e);
		connector.onopen = () => {
			Logger.Log("BS Connected");
			const askLogin = ProtoCreator.Q_GC2BS_AskLogin();
			askLogin.sessionID = gcNID;
			//请求登陆BS
			connector.Send(Protos.GC2BS_AskLogin, askLogin, message => {
				const resp: Protos.BS2GC_LoginRet = <Protos.BS2GC_LoginRet>message;
				switch (resp.result) {
					case Protos.Global.ECommon.Success:
						//把数据保存,加载资源后用于创建战场
						// this._battleInfo.rndSeed = resp.rndSeed;
						// this._battleInfo.frameRate = resp.frameRate;
						// this._battleInfo.keyframeStep = resp.keyframeStep;
						// this._battleInfo.battleTime = resp.battleTime;
						// this._battleInfo.mapID = resp.mapID;

						//请求快照
						// this.RequestSnapshot();
						break;
					default:
						Logger.Warn("failed:" + resp.result);
						break;
				}
			});
		}
		connector.Connect("localhost", port);
	}

	private OnEnterBattle(message: any): void {
		const enterBattle: Protos.CS2GC_EnterBattle = <Protos.CS2GC_EnterBattle>message;
		if (enterBattle.result != Protos.CS2GC_EnterBattle.Result.Success) {
			Logger.Error(enterBattle.result);
		}
		else {
			this.ConnectToBS(enterBattle.gcNID, enterBattle.ip, enterBattle.port);
		}
	}

	private OnBattleEnd(message: any): void {
		const battleEnd: Protos.CS2GC_BattleEnd = <Protos.CS2GC_BattleEnd>message;
	}

	private OnFrameAction(message: any): void {
		const framAction: Protos.BS2GC_FrameAction = <Protos.BS2GC_FrameAction>message;
	}
}