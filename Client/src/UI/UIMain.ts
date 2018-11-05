import { IUIModule } from "./IUIModule";
import { SceneManager } from "../Scene/SceneManager";
import { Global } from "../Global";

export class UIMain implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/main");
		this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
		this._root.setSize(Global.graphic.uiRoot.width, Global.graphic.uiRoot.height);
		this._root.addRelation(Global.graphic.uiRoot, fairygui.RelationType.Size);
		this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		Global.graphic.uiRoot.addChild(this._root);
		this._root.getTransition("t0").play();
	}

	public Exit(): void {
		Global.graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnAutoMatchBtnClick(): void {
		Global.sceneManager.ChangeState(SceneManager.State.Matching);
	}
}