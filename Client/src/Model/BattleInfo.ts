import { Protos } from "../Libs/protos";

export class BattleInfo {
	/**
	 * 玩家ID
	 */
	public playerID: Long;
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
	 * 快照步长
	 */
	public snapshotStep:number;
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
	/**
	 * 玩家信息
	 */
	public playerInfos: Protos.ICS2BS_PlayerInfo[];
}