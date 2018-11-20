import { VEntityState } from "./VEntityState";

export class VMove extends VEntityState {
	protected OnEnter(param: any): void {
		//播放动画
		this.owner.PlayAnim("run");
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number): void {
	}
}