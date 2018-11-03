import { ISnapshotable } from "../ISnapshotable";
import Queue from "../../RC/Collections/Queue";
import { FrameAction } from "../FrameAction";
import { Entity } from "./Entity";
import { BattleInfo } from "../BattleInfo";
import { Champion } from "./Champion";
import * as $protobuf from "../../Libs/protobufjs";
import { Logger } from "../../RC/Utils/Logger";

export class Battle implements ISnapshotable {
	/**
	 * 每帧追帧上限
	 */
	private static readonly MAX_FRAME_CHASE: number = 10;

	private _frameRate: number = 0;
	private _keyframeStep: number = 0;
	private _timeout: number = 0;
	private _mapID: number = 0;
	private _frame: number = 0;

	public get frameRate(): number { return this._frameRate; }
	public get keyframeStep(): number { return this._keyframeStep; }
	public get timeout(): number { return this._timeout; }
	public get mapID(): number { return this._mapID; }
	public get frame(): number { return this._frame; }

	private _msPerFrame: number = 0;
	private _nextKeyFrame: number = 0;
	private _logicElapsed: number = 0;
	private _realElapsed: number = 0;

	private readonly _frameActions: Queue<FrameAction> = new Queue<FrameAction>();
	private readonly _entities: Entity[] = [];
	private readonly _idToEntity: Map<Long, Entity> = new Map<Long, Entity>();

	/**
	 * 初始化
	 * @param battleInfo 战场信息
	 */
	public Init(battleInfo: BattleInfo): void {
		this._frameRate = battleInfo.frameRate;
		this._keyframeStep = battleInfo.keyframeStep;
		this._timeout = battleInfo.battleTime;
		this._mapID = battleInfo.mapID
		this._msPerFrame = 1000 / this._frameRate;

		const reader = $protobuf.Reader.create(battleInfo.snapshot);
		this.DecodeSnapshot(reader);
	}

	/**
	 * 战场结束
	 */
	public End(): void {
		const count = this._entities.length;
		for (let i = 0; i < count; i++)
			this._entities[i].Dispose();
		this._frame = 0;
		this._nextKeyFrame = 0;
		this._logicElapsed = 0;
		this._realElapsed = 0;
		this._frameActions.clear();
	}

	/**
	 * 反编码快照
	 */
	public DecodeSnapshot(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		//设置当前战场的帧数为快照的帧数
		this._frame = reader.int32();
		const count = reader.int32();
		for (let i = 0; i < count; i++) {
			const id = <Long>reader.uint64();
			const entity = this.CreateChampion(id);
			entity.DecodeSnapshot(reader);
		}
	}

	/**
	 * 追赶服务端帧数
	 * @param rdt 真实流逝时间
	 * @param dt 逻辑流逝时间
	 */
	public Chase(): void {
		while (!this._frameActions.isEmpty()) {
			const frameAction = this._frameActions.dequeue();
			let length = frameAction.frame - this.frame;
			while (length >= 0) {
				if (length == 0)
					this.ApplyFrameAction(frameAction);
				else {
					this.UpdateLogic(0, this._msPerFrame);
				}
				--length;
			}
			this._nextKeyFrame = frameAction.frame + this.keyframeStep;
		}
	}

	public Update(dt: number): void {
		//追帧
		this.Chase();

		this._realElapsed += dt;
		if (this.frame < this._nextKeyFrame) {
			this._logicElapsed += dt;

			while (this._logicElapsed >= this._msPerFrame) {
				if (this.frame >= this._nextKeyFrame)
					break;

				this.UpdateLogic(this._realElapsed, this._msPerFrame);

				if (this.frame == this._nextKeyFrame) {
					//todo send action
				}
				this._realElapsed = 0;
				this._logicElapsed -= this._msPerFrame;
			}
		}
	}

	private UpdateLogic(rdt: number, dt: number): void {
		++this._frame;
		Logger.Log("f" + this._frame);
		const count = this._entities.length;
		for (let i = 0; i < count; i++) {
			const entity = this._entities[i];
			entity.Update(dt);
		}
	}

	/**
	 * 应用帧行为
	 * @param frameAction 帧行为
	 */
	private ApplyFrameAction(frameAction: FrameAction): void {
		this._frameActions.clear();
	}

	/**
	 * 处理服务端下发的帧行为
	 * @param msg 协议
	 */
	public OnFrameAction(frame: number, data: Uint8Array): void {
		const count = data[0];
		// data = data.subarray(1, data.length - 1);
		const reader = $protobuf.Reader.create(data);
		reader.pos = 1;
		for (let i = 0; i < count; ++i) {
			const frameAction = new FrameAction(frame);
			frameAction.DeSerialize(reader);
			this._frameActions.enqueue(frameAction);
		}
	}

	/**
	 * 创建英雄
	 */
	public CreateChampion(id: Long): Champion {
		const entity = new Champion();
		entity.Init(id, this);
		this._entities.push(entity);
		this._idToEntity.set(entity.id, entity);
		return entity;
	}
}