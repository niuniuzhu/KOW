export class AniHolder extends fairygui.GGraph {
	public get animation(): Laya.Animation { return this._animation; }

	private _animation: Laya.Animation;

	constructor(imageUrls: string[]) {
		super();

		const roleAni = new Laya.Animation();
		roleAni.autoSize = true;
		roleAni.interval = 100;
		roleAni.loadImages(imageUrls);

		this.setPivot(0.5, 0.5, true);
		this.setNativeObject(roleAni);
		this.setSize(roleAni.width, roleAni.height);

		this._animation = roleAni;
	}

	public Play(start?: any, loop?: boolean, name?: string, showWarn?: boolean): void {
		this._animation.play(start, loop, name, showWarn);
	}

	public dispose(): void {
		this.animation.destroy();
		super.dispose();
	}
}