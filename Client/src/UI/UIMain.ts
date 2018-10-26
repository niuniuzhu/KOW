import { IUIModule } from "./IUIModule";
import { SceneManager } from "../Scene/SceneManager";

export class UIMain implements IUIModule {
	private readonly _root: fairygui.GComponent;

	public get root(): fairygui.GComponent { return this._root; }

	constructor() {
		fairygui.UIPackage.addPackage("res/ui/main");
		this._root = fairygui.UIPackage.createObject("main", "Main").asCom;
		this._root.getChild("n3").onClick(this, this.OnAutoMatchBtnClick);
		this._root.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this._root.addRelation(fairygui.GRoot.inst, fairygui.RelationType.Size);
	}

	public Dispose(): void {
		this._root.dispose();
	}

	public Enter(param: any): void {
		fairygui.GRoot.inst.addChild(this._root);
		this._root.getTransition("t0").play(new laya.utils.Handler(this, () => {
			this._root.getController("c1").selectedIndex = 1;
			this._root.getTransition("t1").play();
		}), 0, 0, 0, -1);
	}

	public Exit(): void {
		fairygui.GRoot.inst.removeChild(this._root);
	}

	public Update(dt: number): void {
	}

	public OnResize(e: laya.events.Event): void {
	}

	private OnAutoMatchBtnClick(): void {
		SceneManager.ChangeState(SceneManager.State.Matching);
	}
}