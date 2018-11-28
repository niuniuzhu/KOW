import { Global } from "../Global";
import { Protos } from "../Libs/protos";
import { Connector } from "../Net/Connector";
import { Logger } from "../RC/Utils/Logger";
import { UIAlert } from "../UI/UIAlert";
import { SceneManager } from "./SceneManager";
import { SceneState } from "./SceneState";

export class GlobalState extends SceneState {
	constructor(type: number) {
		super(type);

		Global.connector.gsConnector.onclose = this.HandleGSDisconnect;
		Global.connector.bsConnector.onclose = this.HandleBSDisconnect;
		Global.connector.AddListener(Connector.ConnectorType.GS, Protos.MsgID.eGS2GC_Kick, this.HandleKick);
	}

	private HandleGSDisconnect(e: Event): void {
		Logger.Error("gs connection closed.");
		// UIAlert.Show("与服务器断开连接", () => Global.sceneManager.ChangeState(SceneManager.State.Login), true);
	}

	private HandleBSDisconnect(e: Event): void {
		Logger.Error("bs connection closed.");
		// UIAlert.Show("与服务器断开连接", () => Global.sceneManager.ChangeState(SceneManager.State.Login), true);
	}

	/**
	 * 处理被GS强制下线
	 * @param message 协议
	 */
	private HandleKick(message: any): void {
		Logger.Warn("kick by gs");
		let kick: Protos.GS2GC_Kick = <Protos.GS2GC_Kick>message;
		switch (kick.reason) {
			case Protos.CS2GS_KickGC.EReason.DuplicateLogin:
				UIAlert.Show("另一台设备正在登陆相同的账号", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
				break;

			case Protos.CS2GS_KickGC.EReason.OutOfSync:
				UIAlert.Show("数据不同步", () => {
					Global.battleManager.Destroy();
					Global.sceneManager.ChangeState(SceneManager.State.Login);
				});
				break;

			default:
				UIAlert.Show("已被服务器强制下线", () => Global.sceneManager.ChangeState(SceneManager.State.Login));
				break;
		}
	}
}