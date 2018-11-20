import { VEntityState } from "./VEntityState";

export class VIdle extends VEntityState {
	protected OnEnter(param: any): void {
		//播放动画
		this.owner.PlayAnim("stand");
	}

	protected OnExit(): void {
	}

	protected OnUpdate(dt: number): void {
	}
}