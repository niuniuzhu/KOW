import { IUIModule } from "./IUIModule";

export class UIMain implements IUIModule {
	private _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
	}

	public Dispose(): void {
	}

	public Enter(param: any): void {
	}

	public Exit(): void {
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}
}