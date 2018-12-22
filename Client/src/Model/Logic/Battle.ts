import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Protos } from "../../Libs/protos";
import { ProtoCreator } from "../../Net/ProtoHelper";
import Queue from "../../RC/Collections/Queue";
import { FMathUtils } from "../../RC/FMath/FMathUtils";
import { FRandom } from "../../RC/FMath/FRandom";
import { FRect } from "../../RC/FMath/FRect";
import { FVec2 } from "../../RC/FMath/FVec2";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { BattleInfo } from "../BattleInfo";
import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { FrameAction } from "../FrameAction";
import { FrameActionGroup } from "../FrameActionGroup";
import { ISnapshotable } from "../ISnapshotable";
import { Bullet } from "./Bullet";
import { Champion } from "./Champion";
import { Emitter } from "./Emitter";
import { EntityInitParams } from "./Entity";
import Long = require("../../Libs/long");
import { Logger } from "../../RC/Utils/Logger";

export class Battle implements ISnapshotable {
	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _snapshotStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;
	private _random: FRandom;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get snapshotStep(): number { return this._snapshotStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }
	public get bounds(): FRect { return this._bounds; }
	public get random(): FRandom { return this._random; }

	private _msPerFrame: number;
	private _logicElapsed: number;
	private _realElapsed: number;
	private _nextKeyFrame: number;
	private _def: Hashtable;
	private _cdef: Hashtable;
	private _bounds: FRect;
	private _destroied: boolean = false;

	private readonly _frameActionGroups: Queue<FrameActionGroup> = new Queue<FrameActionGroup>();
	private readonly _champions: Champion[] = [];
	private readonly _idToChampion: Map<string, Champion> = new Map<string, Champion>();
	private readonly _emitters: Emitter[] = [];
	private readonly _idToEmitter: Map<string, Emitter> = new Map<string, Emitter>();
	private readonly _bullets: Bullet[] = [];
	private readonly _idToBullet: Map<string, Bullet> = new Map<string, Bullet>();

	/**
	 * 设置战场信息
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

		this._cdef = CDefs.GetMap(this._mapID);
		this._def = Defs.GetMap(this._mapID);
		const bWidth = Hashtable.GetNumber(this._cdef, "width");
		const bHeight = Hashtable.GetNumber(this._cdef, "height");
		this._bounds = new FRect(-FMathUtils.Floor(bWidth * 0.5),
			-FMathUtils.Floor(bHeight * 0.5), bWidth, bHeight);
	}

	/**
	 * 战场结束
	 */
	public Destroy(): void {
		if (this._destroied)
			return;
		this._destroied = true;
		this._def = null;
		this._cdef = null;
		this._bounds = null;
		this._frameActionGroups.clear();

		for (let i = 0, count = this._bullets.length; i < count; i++)
			this._bullets[i].Destroy();
		this._bullets.splice(0);
		this._idToBullet.clear();

		for (let i = 0, count = this._emitters.length; i < count; i++)
			this._emitters[i].Destroy();
		this._emitters.splice(0);
		this._idToEmitter.clear();

		for (let i = 0, count = this._champions.length; i < count; i++)
			this._champions[i].Destroy();
		this._champions.splice(0);
		this._idToChampion.clear();
	}

	/**
	 * 心跳更新
	 * @param dt 上次更新到当前流逝的时间
	 */
	public Update(dt: number): void {
		//追帧
		this.Chase(this._frameActionGroups, true, true);

		this._realElapsed = FMathUtils.Add(this._realElapsed, dt);
		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed = FMathUtils.Add(this._logicElapsed, dt);

			while (this._logicElapsed >= this._msPerFrame) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._msPerFrame, true, true);
				this._realElapsed = 0;
				this._logicElapsed = FMathUtils.Sub(this._logicElapsed, this._msPerFrame);
			}
		}
	}

	/**
	 * 更新逻辑帧
	 * @param dt 上一帧到当前帧流逝的时间
	 */
	private UpdateLogic(dt: number, updateView: boolean, commitSnapshot: boolean): void {
		++this._frame;

		//update champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.Update(dt);
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

		//sync to view
		if (updateView) {
			this.SyncToView();
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

		//destroy champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			if (champion.markToDestroy) {
				this.DestroyChampionAt(i);
				--i;
				--count;
			}
		}

		//判断是否需要提交快照数据
		if (commitSnapshot && (this._frame % this._snapshotStep) == 0) {
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
	}

	/**
	 * 解码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._frame = reader.int32();
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
	public Chase(frameActionGroups: Queue<FrameActionGroup>, updateView: boolean, commitSnapshot: boolean): void {
		if (frameActionGroups == null)
			return;
		while (!frameActionGroups.isEmpty()) {
			const frameActionGroup = frameActionGroups.dequeue();
			let length = frameActionGroup.frame - this.frame;
			while (length > 0) {
				this.UpdateLogic(this._msPerFrame, updateView, commitSnapshot);
				--length;
			}
			this.ApplyFrameActionGroup(frameActionGroup);
			this._nextKeyFrame = frameActionGroup.frame + this.keyframeStep;
		}
	}

	/**
	 * 给定指定id制作运行时id
	 */
	public MakeRid(id: number): Long {
		const rnd = this._random.NextFloor(0, 0xffffffff);
		return Long.fromBits(id, rnd);
	}

	/**
	 * 创建玩家
	 * @param playerInfos 玩家信息
	 */
	public CreatePlayers(playerInfos: Protos.ICS2BS_PlayerInfo[]): void {
		let arr = Hashtable.GetArray(this._def, "born_pos");
		let count = arr.length;
		const bornPoses: FVec2[] = [];
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			bornPoses.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
		}

		arr = Hashtable.GetArray(this._def, "born_dir");
		count = arr.length;
		const bornDirs: FVec2[] = [];
		for (let i = 0; i < count; i++) {
			const pi = <number[]>arr[i];
			bornDirs.push(new FVec2(FMathUtils.ToFixed(pi[0]), FMathUtils.ToFixed(pi[1])));
		}

		const params = new EntityInitParams();
		count = playerInfos.length;
		for (let i = 0; i < count; ++i) {
			const playerInfo = playerInfos[i];
			params.rid = playerInfo.gcNID;
			params.id = playerInfo.actorID;
			params.team = playerInfo.team;
			params.name = playerInfo.name;
			const player = this.CreateChampion(params);
			if (player.team >= bornPoses.length ||
				player.team >= bornDirs.length) {
				throw new Error("invalid team:" + player.team + ", player:" + player.rid);
			}
			player.position.CopyFrom(bornPoses[player.team]);
			player.direction.CopyFrom(bornDirs[player.team]);
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
	 * 应用帧行为
	 * @param frameAction 帧行为
	 */
	private ApplyFrameActionGroup(frameActionGroup: FrameActionGroup): void {
		for (let i = 0; i < frameActionGroup.numActions; i++) {
			this.ApplyFrameAction(frameActionGroup.Get(i));
		}
	}

	private ApplyFrameAction(frameAction: FrameAction): void {
		const champion = this.GetChampion(frameAction.gcNID);
		if ((frameAction.inputFlag & FrameAction.InputFlag.Move) > 0) {
			champion.BeginMove(frameAction.dx, frameAction.dy);
		}
		if ((frameAction.inputFlag & FrameAction.InputFlag.Skill) > 0) {
			champion.UseSkill(frameAction.sid);
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
		this._frameActionGroups.enqueue(frameActionGroup);
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
		return str;
	}
}