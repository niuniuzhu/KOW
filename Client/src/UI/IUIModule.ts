export interface IUIModule {
	Dispose(): void;
	Enter(param: any): void;
	Exit(): void;
	Update(deltaTime: number): void;
	OnResize(e: laya.events.Event): void
}