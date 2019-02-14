import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as Long from "../../Libs/long";
import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import { ProtoCreator } from "../../Net/ProtoHelper";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FRandom } from "../../RC/FMath/FRandom";
import { FRect } from "../../RC/FMath/FRect";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { Logger } from "../../RC/Utils/Logger";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { BattleInfo } from "../BattleInfo";
import { Defs } from "../Defs";
import { Bullet } from "./Bullet";
import { CalcationManager } from "./CalcationManager";
import { Champion } from "./Champion";
import { Emitter } from "./Emitter";
import { EntityInitParams } from "./Entity";
import { FrameActionGroup } from "./FrameActionGroup";
import { HPPacket } from "./HPPacket";
import { ISnapshotable } from "./ISnapshotable";
import { SceneItem } from "./SceneItem";

export class Battle implements ISnapshotable {
	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _snapshotStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;
	private _random: FRandom;

	/**
	 * 帧率
	 */
	public get frameRate(): number { return this._frameRate; }
	/**
	 * 关键帧步长
	 */
	public get keyframeStep(): number { return this._keyframeStep; }
	/**
	 * 快照步长
	 */
	public get snapshotStep(): number { return this._snapshotStep; }
	/**
	 * 战场超时时间
	 */
	public get timeout(): number { return this._timeout; }
	/**
	 * 地图id
	 */
	public get mapID(): number { return this._mapID; }
	/**
	 * 当前帧数
	 */
	public get frame(): number { return this._frame; }
	/**
	 * 地图范围
	 */
	public get bounds(): FRect { return this._bounds; }
	/**
	 * 禁区超时时间
	 */
	public get gladiatorTimeout(): number { return this._gladiatorTimeout; }
	/**
	 * 禁区中心位置
	 */
	public get gladiatorPos(): FVec2 { return this._gladiatorPos; }
	/**
	 * 禁区半径
	 */
	public get gladiatorRadius(): number { return this._gladiatorRadius; }
	/**
	 * 随机器
	 */
	public get random(): FRandom { return this._random; }
	/**
	 * 数值计算管理器
	 */
	public get calcManager(): CalcationManager { return this._calcManager; }
	/**
	 * 战场是否结束
	 */
	public get finished(): boolean { return this._finished; }
	/**
	 * 是否在追帧状态
	 */
	public chase: boolean = false;

	private _msPerFrame: number;
	private _logicElapsed: number;
	private _realElapsed: number;
	private _nextKeyFrame: number;
	private _bornPoses: FVec2[] = [];
	private _bornDirs: FVec2[] = [];
	private _bounds: FRect;
	private _gladiatorTimeout: number;
	private _gladiatorPos: FVec2;
	private _gladiatorRadius: number;

	private _finished: boolean = false;
	private _destroied: boolean = true;

	private readonly _frameActionGroups: FrameActionGroup[] = [];
	private readonly _champions: Champion[] = [];
	private readonly _idToChampion: Map<string, Champion> = new Map<string, Champion>();
	private readonly _emitters: Emitter[] = [];
	private readonly _idToEmitter: Map<string, Emitter> = new Map<string, Emitter>();
	private readonly _bullets: Bullet[] = [];
	private readonly _idToBullet: Map<string, Bullet> = new Map<string, Bullet>();
	private readonly _items: SceneItem[] = [];
	private readonly _idToItem: Map<string, SceneItem> = new Map<string, SceneItem>();
	private readonly _hpPacket: HPPacket;
	private readonly _calcManager: CalcationManager;

	constructor() {
		this._hpPacket = new HPPacket(this);
		this._calcManager = new CalcationManager(this);
	}

	/**
	 * 战场结束
	 */
	public Destroy(): void {
		if (this._destroied)
			return;
		this._destroied = true;
		this._bounds = null;
		this._frameActionGroups.splice(0);
		this._calcManager.Destroy();

		for (let i = 0, count = this._champions.length; i < count; i++)
			this._champions[i].Destroy();
		this._champions.splice(0);
		this._idToChampion.clear();

		for (let i = 0, count = this._emitters.length; i < count; i++)
			this._emitters[i].Destroy();
		this._emitters.splice(0);
		this._idToEmitter.clear();

		for (let i = 0, count = this._bullets.length; i < count; i++)
			this._bullets[i].Destroy();
		this._bullets.splice(0);
		this._idToBullet.clear();

		for (let i = 0, count = this._items.length; i < count; i++)
			this._items[i].Destroy();
		this._items.splice(0);
		this._idToItem.clear();
	}

	/**
	 * 设置战场信息,资源预加载后调用
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		this._destroied = false;
		this._frameRate = battleInfo.frameRate;
		this._keyframeStep = battleInfo.keyframeStep;
		this._snapshotStep = battleInfo.snapshotStep;
		this._random = new FRandom(battleInfo.rndSeed);
		this._timeout = battleInfo.battleTime;
		this._mapID = battleInfo.mapID
		this._msPerFrame = FMathUtils.ToFixed(1000 / this._frameRate);
		this._frame = 0;
		this._nextKeyFrame = 0;
		this._logicElapsed = 0;
		this._realElapsed = 0;
		this._finished = false;

		const defs = Defs.GetMap(this._mapID);
		let arr = Hashtable.GetArray(defs, "born_pos");
		let count = arr.length;
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			this._bornPoses.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
		}

		arr = Hashtable.GetArray(defs, "born_dir");
		count = arr.length;
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			this._bornDirs.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
		}
		const bWidth = Hashtable.GetNumber(defs, "width");
		const bHeight = Hashtable.GetNumber(defs, "height");
		this._bounds = new FRect(-FMathUtils.Floor(bWidth * 0.5),
			-FMathUtils.Floor(bHeight * 0.5), bWidth, bHeight);
		this._gladiatorTimeout = Hashtable.GetNumber(defs, "gladiator_timeout");
		this._gladiatorPos = Hashtable.GetFVec2(defs, "gladiator_pos");
		this._gladiatorRadius = Hashtable.GetNumber(defs, "gladiator_radius");
		this._hpPacket.Init(defs);
	}

	/**
	 * 心跳更新
	 * @param dt 上次更新到当前流逝的时间
	 */
	public Update(dt: number): void {
		//追帧
		this.Chase(this._frameActionGroups);
		this._realElapsed = FMathUtils.Add(this._realElapsed, dt);
		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed = FMathUtils.Add(this._logicElapsed, dt);

			while (this._logicElapsed >= this._msPerFrame) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._msPerFrame);
				this._realElapsed = 0;
				this._logicElapsed = FMathUtils.Sub(this._logicElapsed, this._msPerFrame);
			}
		}
	}

	/**
	 * 更新逻辑帧
	 * @param dt 上一帧到当前帧流逝的时间
	 */
	private UpdateLogic(dt: number): void {
		++this._frame;

		//check for creating items
		this._hpPacket.Update(dt);

		//update champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.Update(dt);
		}
		//detect champion's intersetions
		for (let i = 0, count = this._champions.length - 1; i < count; i++) {
			const champion = this._champions[i];
			champion.IntersectionTest(this._champions, i + 1);
		}
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.UpdatePhysic(dt);
		}
		//now update the position
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.AfterUpdate(dt);
		}

		//update emitters
		for (let i = 0, count = this._emitters.length; i < count; i++) {
			const emitter = this._emitters[i];
			emitter.Update(dt);
		}

		//update bullets
		for (let i = 0, count = this._bullets.length; i < count; i++) {
			const bullet = this._bullets[i];
			bullet.Update(dt);
		}

		//update items
		for (let i = 0, count = this._items.length; i < count; i++) {
			const item = this._items[i];
			item.Update(dt);
		}

		//handle item's intersections
		for (let i = 0, count = this._items.length; i < count; i++) {
			const item = this._items[i];
			item.Intersect();
		}

		//handle bullet's intersections
		for (let i = 0, count = this._bullets.length; i < count; i++) {
			const bullet = this._bullets[i];
			bullet.Intersect();
		}

		this._calcManager.Update();

		//update after hit
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.UpdateAfterHit();
		}

		//check gladiator
		let championInGladiator: Champion = null;
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			if (champion.isDead || !champion.isInGladiator)
				continue;
			//仅当一个玩家在禁区时计时生效
			//当championInGladiator不为null,即存在多个玩家在禁区
			if (championInGladiator != null) {
				championInGladiator = null;
				break;
			}
			championInGladiator = champion;
		}
		if (championInGladiator != null) {
			//更新禁区时间
			championInGladiator.UpdateGladiator(dt);
		}

		//sync to view
		if (!this.chase) {
			this.SyncToView();
		}

		//destroy champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			if (champion.markToDestroy) {
				this.DestroyChampionAt(i);
				--i;
				--count;
			}
		}

		//destroy items
		for (let i = 0, count = this._items.length; i < count; i++) {
			const item = this._items[i];
			if (item.markToDestroy) {
				this.DestroySceneItemAt(i);
				--i;
				--count;
			}
		}

		//destroy bullets
		for (let i = 0, count = this._bullets.length; i < count; i++) {
			const bullet = this._bullets[i];
			if (bullet.markToDestroy) {
				this.DestroyBulletAt(i);
				--i;
				--count;
			}
		}

		//destroy emitters
		for (let i = 0, count = this._emitters.length; i < count; i++) {
			const emitter = this._emitters[i];
			if (emitter.markToDestroy) {
				this.DestroyEmitterAt(i);
				--i;
				--count;
			}
		}

		//判断战场是否结束
		this.CheckBattleEnd();

		//判断是否需要提交快照数据
		if (!this.chase && (this._frame % this._snapshotStep) == 0) {
			const writer = $protobuf.Writer.create();
			this.EncodeSnapshot(writer);
			const data = writer.finish();
			//提交快照
			const request = ProtoCreator.Q_GC2BS_CommitSnapshot();
			request.frame = this._frame;
			request.data = data;
			Global.connector.SendToBS(Protos.GC2BS_CommitSnapshot, request);
		}
	}

	/**
	 * 编码快照
	 */
	public EncodeSnapshot(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._frame);
		writer.bool(this._finished);
		writer.double(this._random.seed);

		//champions
		let count = this._champions.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const champion = this._champions[i];
			champion.EncodeSnapshot(writer);
		}

		//emitters
		count = this._emitters.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const emitter = this._emitters[i];
			emitter.EncodeSnapshot(writer);
		}

		//bullets
		count = this._bullets.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const bullet = this._bullets[i];
			bullet.EncodeSnapshot(writer);
		}

		//items
		count = this._items.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const item = this._items[i];
			item.EncodeSnapshot(writer);
		}

		this._calcManager.EncodeSnapshot(writer);
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._frame = reader.int32();
		this._finished = reader.bool();
		this._random.seed = reader.double();

		//champions
		let count = reader.int32();
		for (let i = 0; i < count; i++) {
			const champion = new Champion(this);
			champion.DecodeSnapshot(reader);
			this._champions.push(champion);
			this._idToChampion.set(champion.rid.toString(), champion);
		}

		//emitters
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const emitter = new Emitter(this);
			emitter.DecodeSnapshot(reader);
			this._emitters.push(emitter);
			this._idToEmitter.set(emitter.rid.toString(), emitter);
		}

		//bullets
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const bullet = new Bullet(this);
			bullet.DecodeSnapshot(reader);
			this._bullets.push(bullet);
			this._idToBullet.set(bullet.rid.toString(), bullet);
		}

		//items
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const item = new SceneItem(this);
			item.DecodeSnapshot(reader);
			this._items.push(item);
			this._idToItem.set(item.rid.toString(), item);
		}

		this._calcManager.DecodeSnapshot(reader);
	}

	/**
	 * 同步数据编码
	 */
	public EncodeSync(writer: $protobuf.Writer | $protobuf.BufferWriter): void {
		writer.int32(this._frame);
		//champions
		let count = this._champions.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const champion = this._champions[i];
			champion.EncodeSync(writer);
		}
		//emitter no need

		//bullets
		count = this._bullets.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const bullet = this._bullets[i];
			bullet.EncodeSync(writer);
		}

		//sceneitem
		count = this._items.length;
		writer.int32(count);
		for (let i = 0; i < count; i++) {
			const bullet = this._items[i];
			bullet.EncodeSync(writer);
		}
	}

	/**
	 * 把初始状态同步到表现层
	 */
	public SyncInitToView(): void {
		const writer = $protobuf.Writer.create();
		this.EncodeSync(writer);
		const data = writer.finish();
		SyncEvent.BattleInit(data);
	}

	/**
	 * 把战场状态同步到表现层
	 */
	public SyncToView(): void {
		const writer = $protobuf.Writer.create();
		this.EncodeSync(writer);
		const data = writer.finish();
		SyncEvent.Snapshot(data);
	}

	/**
	 * 追赶服务端帧数
	 */
	public Chase(frameActionGroups: FrameActionGroup[]): void {
		for (const frameActionGroup of frameActionGroups) {
			let length = frameActionGroup.frame - this.frame;
			//注意,先执行逻辑再执行指令
			while (length > 0) {
				this.UpdateLogic(this._msPerFrame);
				--length;
			}
			this.ApplyFrameActionGroup(frameActionGroup);
			this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
		}
		frameActionGroups.splice(0);
	}

	/**
	 * 给定指定id制作运行时id
	 */
	public MakeRid(id: number): Long {
		const rnd = this._random.NextFloor(0, 0xfffff);
		return Long.fromBits(id, rnd);
	}

	/**
	 * 创建玩家
	 * @param playerInfos 玩家信息
	 */
	public CreatePlayers(playerInfos: Protos.ICS2BS_PlayerInfo[]): void {
		const params = new EntityInitParams();
		const count = playerInfos.length;
		for (let i = 0; i < count; ++i) {
			const playerInfo = playerInfos[i];
			params.rid = playerInfo.gcNID;
			params.id = playerInfo.actorID;
			params.team = playerInfo.team;
			params.name = playerInfo.nickname;
			params.position = this._bornPoses[params.team];
			params.direction = this._bornDirs[params.team];
			const player = this.CreateChampion(params);
			if (player.team >= this._bornPoses.length ||
				player.team >= this._bornDirs.length) {
				throw new Error("invalid team:" + player.team + ", player:" + player.rid);
			}
		}
	}

	/**
	 * 创建战士
	 */
	public CreateChampion(params: EntityInitParams): Champion {
		const champion = new Champion(this);
		champion.Init(params);
		this._champions.push(champion);
		this._idToChampion.set(champion.rid.toString(), champion);
		//sync to view
		const writer = $protobuf.Writer.create();
		champion.EncodeSnapshot(writer);
		const data = writer.finish();
		SyncEvent.EntityCreated(champion.type, data);
		return champion;
	}

	/**
	 * 销毁战士
	 */
	public DestroyChampion(champion: Champion): void {
		champion.Destroy();
		this._champions.splice(this._champions.indexOf(champion), 1);
		this._idToChampion.delete(champion.rid.toString());
	}

	/**
	 * 销毁战士
	 */
	private DestroyChampionAt(index: number): void {
		const champion = this._champions[index];
		champion.Destroy();
		this._champions.splice(index, 1);
		this._idToChampion.delete(champion.rid.toString());
	}

	/**
	 * 获取指定rid的战士
	 */
	public GetChampion(rid: Long): Champion {
		return this._idToChampion.get(rid.toString());
	}

	/**
	 * 获取战士列表
	 */
	public GetChampions(): Champion[] {
		return this._champions;
	}

	/**
	 * 创建发射器
	 */
	public CreateEmitter(id: number, casterID: Long, skillID: number): Emitter {
		const emitter = new Emitter(this);
		emitter.Init(this.MakeRid(id), id, casterID, skillID);
		this._emitters.push(emitter);
		this._idToEmitter.set(emitter.rid.toString(), emitter);
		return emitter;
	}

	/**
	 * 销毁发射器
	 */
	public DestroyEmitter(emitter: Emitter): void {
		emitter.Destroy();
		this._emitters.splice(this._emitters.indexOf(emitter), 1);
		this._idToEmitter.delete(emitter.rid.toString());
	}

	/**
	 * 销毁发射器
	 */
	private DestroyEmitterAt(index: number): void {
		const emitter = this._emitters[index];
		emitter.Destroy();
		this._emitters.splice(index, 1);
		this._idToEmitter.delete(emitter.rid.toString());
	}

	/**
	 * 获取指定rid的发射器
	 */
	public GetEmitter(rid: Long): Emitter {
		return this._idToEmitter.get(rid.toString());
	}

	/**
	 * 创建子弹
	 */
	public CreateBullet(id: number, casterID: Long, skillID: number, position: FVec2, direction: FVec2): Bullet {
		const params = new EntityInitParams();
		params.rid = this.MakeRid(id);
		params.id = id;
		params.casterID = casterID;
		params.skillID = skillID;
		params.position = position;
		params.direction = direction;
		const bullet = new Bullet(this);
		bullet.Init(params);
		this._bullets.push(bullet);
		this._idToBullet.set(bullet.rid.toString(), bullet);
		//sync to view
		const writer = $protobuf.Writer.create();
		bullet.EncodeSnapshot(writer);
		const data = writer.finish();
		SyncEvent.EntityCreated(bullet.type, data);
		return bullet;
	}

	/**
	 * 销毁子弹
	 */
	public DestroyBullet(bullet: Bullet): void {
		bullet.Destroy();
		this._bullets.splice(this._bullets.indexOf(bullet), 1);
		this._idToBullet.delete(bullet.rid.toString());
	}

	/**
	 * 销毁子弹
	 */
	private DestroyBulletAt(index: number): void {
		const bullet = this._bullets[index];
		bullet.Destroy();
		this._bullets.splice(index, 1);
		this._idToBullet.delete(bullet.rid.toString());
	}

	/**
	 * 获取指定rid的子弹
	 */
	public GetBullet(rid: Long): Bullet {
		return this._idToBullet.get(rid.toString());
	}

	/**
	 * 创建场景物品
	 */
	public CreateSceneItem(id: number, position: FVec2 = FVec2.zero, direction: FVec2 = FVec2.down): SceneItem {
		const params = new EntityInitParams();
		params.rid = this.MakeRid(id);
		params.id = id;
		params.position = position;
		params.direction = direction;
		const item = new SceneItem(this);
		item.Init(params);
		this._items.push(item);
		this._idToItem.set(item.rid.toString(), item);
		//sync to view
		const writer = $protobuf.Writer.create();
		item.EncodeSnapshot(writer);
		const data = writer.finish();
		SyncEvent.EntityCreated(item.type, data);
		return item;
	}

	public GetSceneItems(): SceneItem[] {
		return this._items;
	}

	/**
	 * 销毁场景物品
	 */
	public DestroySceneItem(sceneItem: SceneItem): void {
		sceneItem.Destroy();
		this._items.splice(this._items.indexOf(sceneItem), 1);
		this._idToItem.delete(sceneItem.rid.toString());
	}

	/**
	 * 销毁场景物品
	 */
	private DestroySceneItemAt(index: number): void {
		const item = this._items[index];
		item.Destroy();
		this._items.splice(index, 1);
		this._idToItem.delete(item.rid.toString());
	}

	/**
	 * 获取指定rid的场景物品
	 */
	public GetSceneItem(rid: Long): SceneItem {
		return this._idToItem.get(rid.toString());
	}

	/**
	 * 应用帧行为
	 * @param frameAction 帧行为
	 */
	private ApplyFrameActionGroup(frameActionGroup: FrameActionGroup): void {
		for (let i = 0; i < frameActionGroup.numActions; i++) {
			const frameAction = frameActionGroup.Get(i);
			const champion = this.GetChampion(frameAction.gcNID);
			//todo champion may be null?????
			champion.FrameAction(frameAction);
		}
	}

	/**
	 * 检查战场是否结束
	 */
	private CheckBattleEnd(): void {
		if (this._finished)
			return;
		let team0Win = false;
		let team1Win = false;
		//检查禁区情况
		for (const champion of this._champions) {
			if (champion.gladiatorTime >= this._gladiatorTimeout) {
				if (champion.team == 0)
					team0Win = true;
				else
					team1Win = true;
			}
		}
		//如果以上检测没有胜利队伍
		if (!team0Win && !team1Win && this._champions.length > 1) {
			//检查全员死亡
			team0Win = true;
			team1Win = true;
			for (const champion of this._champions) {
				if (champion.team == 0 && !champion.isDead) {
					team1Win = false;
				}
				if (champion.team == 1 && !champion.isDead) {
					team0Win = false;
				}
			}
		}
		let winTeam = 0;
		if (team0Win && !team1Win) {//team0 win
			winTeam = 1 << 0;
		}
		else if (!team0Win && team1Win) {//team1 win
			winTeam = 1 << 1;

		}
		else if (team0Win && team1Win) {//both win
			winTeam = (1 << 0) | (1 << 1);
		}
		if (winTeam != 0) {
			//记录一次快照
			const writer = $protobuf.Writer.create();
			this.EncodeSnapshot(writer);
			const data = writer.finish();

			//通知服务端战场结束
			const msg = ProtoCreator.Q_GC2BS_EndBattle();
			msg.winTeam = winTeam;
			msg.snapshot = data;

			//发送协议
			Global.connector.bsConnector.Send(Protos.GC2BS_EndBattle, msg);

			this._finished = true;
		}
	}

	/**
	 * 处理服务器下发的快照信息
	 * @param ret 协议
	 */
	public HandleSnapShot(ret: Protos.BS2GC_RequestSnapshotRet): void {
		//解码快照
		const reader = $protobuf.Reader.create(ret.snapshot);
		this.DecodeSnapshot(reader);
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param msg 协议
	 */
	public HandleFrameAction(frame: number, data: Uint8Array): void {
		const frameActionGroup = new FrameActionGroup(frame);
		frameActionGroup.Deserialize(data);
		this._frameActionGroups.push(frameActionGroup);
	}

	/**
	 * 处理服务端通知数据不同步
	 * @param outOfSync 协议
	 */
	public HandleOutOfSync(msg: Protos.BS2GC_OutOfSync): void {
		let str = "===============data1===============";
		let reader = $protobuf.Reader.create(msg.data1);
		str += this.Dump(reader);
		str += "===============data2===============";
		reader = $protobuf.Reader.create(msg.data2);
		str += this.Dump(reader);
		Logger.Log(str);
	}

	private Dump(reader: $protobuf.Reader | $protobuf.BufferReader): string {
		let str = "";
		//frame
		reader.int32();
		//mark to end
		reader.bool();
		//seed
		reader.double();

		//champions
		let count = reader.int32();
		for (let i = 0; i < count; i++) {
			const champion = new Champion(this);
			champion.DecodeSnapshot(reader);
			str += "======champion======\n";
			str += champion.Dump();
		}

		//emitters
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const emitter = new Emitter(this);
			emitter.DecodeSnapshot(reader);
			str += "======emitter======\n";
			str += emitter.Dump();
		}

		//bullets
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const bullet = new Bullet(this);
			bullet.DecodeSnapshot(reader);
			str += "======bullet======\n";
			str += bullet.Dump();
		}

		//scene_items
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const item = new SceneItem(this);
			item.DecodeSnapshot(reader);
			str += "======scene_item======\n";
			str += item.Dump();
		}
		return str;
	}
}