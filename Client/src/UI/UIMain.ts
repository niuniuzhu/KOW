import { IUIModule } from "./IUIModule";
import { SceneManager } from "../Scene/SceneManager";
import { Graphic } from "../Graphic";

export class UIMain implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/main");
		this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
		this._root.setSize(Graphic.uiRoot.width, Graphic.uiRoot.height);
		this._root.addRelation(Graphic.uiRoot, fairygui.RelationType.Size);
		this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		Graphic.uiRoot.addChild(this._root);
		this._root.getTransition("t0").play(new laya.utils.Handler(this, () => {
			this._root.getController("c1").selectedIndex = 1;
			this._root.getTransition("t1").play();
		}), 0, 0, 0, -1);
	}

	public Exit(): void {
		Graphic.uiRoot.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnAutoMatchBtnClick(): void {
		SceneManager.ChangeState(SceneManager.State.Matching);
	}
}