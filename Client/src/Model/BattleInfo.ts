export class BattleInfo {
	/**
	 * 随机种子
	 */
	public rndSeed: number;
	/**
	 * 帧率
	 */
	public frameRate: number;
	/**
	 * 关键帧步长
	 */
	public keyframeStep: number;
	/**
	 * 战场限时
	 */
	public battleTime: number;
	/**
	 * 地图ID
	 */
	public mapID: number;

	/**
	 * 客户端发起请求时的帧数
	 */
	public reqFrame: number;
	/**
	 * 服务端当前帧数
	 */
	public serverFrame: number;
	/**
	 * 快照
	 */
	public snapshot: Uint8Array;
}