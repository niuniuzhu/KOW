import { IUIModule } from "./IUIModule";
import { GSConnector } from "../Net/GSConnector";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";

export class UIMatching implements IUIModule {
	private _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
		GSConnector.AddListener(Protos.MsgID.eCS2GC_BeginBattle, this.OnBeginBattle.bind(this));

		//请求匹配
		let beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		ProtoCreator.MakeTransMessage(beginMatch, Protos.MsgOpts.TransTarget.CS, 0);
		GSConnector.Send(Protos.GC2CS_BeginMatch, beginMatch, message => {
			let resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			console.log(resp);
		});
	}

	public Leave(): void {
		GSConnector.RemoveListener(Protos.MsgID.eCS2GC_BeginBattle, this.OnBeginBattle.bind(this));
	}

	public Update(deltaTime: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnBeginBattle(message: any): void {
		let beginBattle: Protos.CS2GC_BeginBattle = <Protos.CS2GC_BeginBattle>message;
		console.log(beginBattle);
	}
}