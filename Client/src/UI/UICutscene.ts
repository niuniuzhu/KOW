import { IUIModule } from "./IUIModule";
import { Network } from "../Net/Network";
import { Protos } from "../libs/protos";
import { ProtoCreator } from "../Net/ProtoHelper";

export class UICutscene implements IUIModule {
	private _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
		let beginMatch = ProtoCreator.Q_GC2CS_BeginMatch();
		Network.Send(Protos.GC2CS_BeginMatch, beginMatch, message=> {
			let resp: Protos.CS2GC_BeginMatchRet = <Protos.CS2GC_BeginMatchRet>message;
			console.log(resp);
		});
	}

	public Leave(): void {
	}

	public Update(deltaTime: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}
}