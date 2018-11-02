export class BattleInfo {
	public rndSeed: number;
	public frameRate: number;
	public keyframeStep: number;
	public battleTime: number;
	public mapID: number;

	public reqFrame: number;
	public curFrame: number;
	public snapshot: Uint8Array;
}