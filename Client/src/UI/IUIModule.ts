export interface IUIModule {
	Dispose(): void;
	Enter(param: any): void;
	Leave(): void;
	Update(deltaTime: number): void;
	OnResize(e: laya.events.Event): void;
}