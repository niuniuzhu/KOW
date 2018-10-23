import { FSMState } from "../FSM/FSMState";
import { IUIModule } from "../UI/IUIModule";

export class SceneState extends FSMState {
	protected __ui: IUIModule;

	constructor(type: number) {
		super(type);
	}

	protected OnEnter(param: any): void {
		if (this.__ui != null)
			this.__ui.Enter(param);
	}

	protected OnExit(): void {
		if (this.__ui != null)
			this.__ui.Exit();
	}

	protected OnUpdate(dt: number): void {
		if (this.__ui != null)
			this.__ui.Update(dt);
	}
}