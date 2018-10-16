import { FSMState } from "../FSM/FSMState";
import { IUIModule } from "../UI/IUIModule";

export class SceneState extends FSMState {
	protected __ui:IUIModule;

	constructor(type: number) {
		super(type);
	}

	protected OnEnter(param: any): void {
		this.__ui.Enter(param);
	}

	protected OnExit(): void {
		this.__ui.Exit();
	}

	protected OnUpdate(dt: number): void {
		this.__ui.Update(dt);
	}
}