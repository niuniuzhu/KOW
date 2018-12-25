import { Consts } from "../../Consts";
import { Global } from "../../Global";
import * as $protobuf from "../../Libs/protobufjs";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { SyncEvent } from "../BattleEvent/SyncEvent";
import { UIEvent } from "../BattleEvent/UIEvent";
import { BattleInfo } from "../BattleInfo";
import { CDefs } from "../CDefs";
import { Camera } from "./Camera";
import { VBullet } from "./VBullet";
import { VChampion } from "./VChampion";
import { Bullet } from "../Logic/Bullet";

export class VBattle {
	private _mapID: number = 0;
	private _playerID: Long;
	private readonly _camera: Camera;

	private readonly _champions: VChampion[] = [];
	private readonly _idToChampion: Map<string, VChampion> = new Map<string, VChampion>();
	private readonly _bullets: VBullet[] = [];
	private readonly _idToBullet: Map<string, VBullet> = new Map<string, VBullet>();

	private _root: fairygui.GComponent;
	private _logicFrame: number;
	private _def: Hashtable;
	private _destroied: boolean = false;

	constructor() {
		this._camera = new Camera();
	}

	/**
	 * 设置战场信息
	 * @param battleInfo 战场信息
	 */
	public SetBattleInfo(battleInfo: BattleInfo): void {
		SyncEvent.AddListener(SyncEvent.E_BATTLE_INIT, this.OnBattleInit.bind(this));
		SyncEvent.AddListener(SyncEvent.E_SNAPSHOT, this.OnSnapshot.bind(this));

		this._destroied = false;
		this._mapID = battleInfo.mapID
		//加载配置
		this._def = CDefs.GetMap(this._mapID);

		this._camera.SetBounds(Hashtable.GetNumber(this._def, "width"), Hashtable.GetNumber(this._def, "height"));

		this._playerID = battleInfo.playerID;

		this._root = fairygui.UIPackage.createObject("assets", Consts.ASSETS_MAP_PREFIX + battleInfo.mapID).asCom;
		this._root.touchable = false;
		Global.graphic.mapRoot.addChild(this._root);
	}

	/**
	 * 战场结束
	 */
	public Destroy(): void {
		if (this._destroied)
			return;
		this._destroied = true;

		SyncEvent.RemoveListener(SyncEvent.E_BATTLE_INIT);
		SyncEvent.RemoveListener(SyncEvent.E_SNAPSHOT);

		for (let i = 0, count = this._bullets.length; i < count; ++i) {
			this._bullets[i].Destroy();
		}
		this._bullets.splice(0);
		this._idToBullet.clear();

		for (let i = 0, count = this._champions.length; i < count; ++i) {
			this._champions[i].Destroy();
		}
		this._champions.splice(0);
		this._idToChampion.clear();

		this._root.dispose();
		this._root = null;
		this._def = null;
		this._logicFrame = 0;
	}

	public Update(dt: number): void {
		//更新摄像机
		this._camera.Update(dt);

		//update champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			champion.Update(dt);
		}

		//update bullets
		for (let i = 0, count = this._bullets.length; i < count; i++) {
			const bullet = this._bullets[i];
			bullet.Update(dt);
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

		//destroy champions
		for (let i = 0, count = this._champions.length; i < count; i++) {
			const champion = this._champions[i];
			if (champion.markToDestroy) {
				this.DestroyChampionAt(i);
				--i;
				--count;
			}
		}
	}

	/**
	 * 解码同步数据
	 */
	public DecodeSync(reader: $protobuf.Reader | $protobuf.BufferReader): void {
		this._logicFrame = reader.int32();
		//champions
		let count = reader.int32();
		for (let i = 0; i < count; i++) {
			const rid = <Long>reader.uint64();
			let champion = this.GetChampion(rid);
			if (champion == null) {
				champion = new VChampion(this);
				champion.DecodeSync(rid, reader, true);
				this._champions.push(champion);
				this._idToChampion.set(champion.rid.toString(), champion);
				const isSelf = champion.rid.equals(this._playerID);
				if (isSelf) {
					this._camera.lookAt = champion;
				}
				//通知UI创建实体
				UIEvent.ChampionInit(champion, isSelf);
			} else {
				champion.DecodeSync(rid, reader, false);
			}
		}

		//bullets
		count = reader.int32();
		for (let i = 0; i < count; i++) {
			const rid = <Long>reader.uint64();
			let bullet = this.GetBullet(rid);
			if (bullet == null) {
				bullet = new VBullet(this);
				bullet.DecodeSync(rid, reader, true);
				this._bullets.push(bullet);
				this._idToBullet.set(bullet.rid.toString(), bullet);
			} else {
				bullet.DecodeSync(rid, reader, false);
			}
		}
	}

	/**
	 * 销毁战士
	 */
	public DestroyChampion(champion: VChampion): void {
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
	public GetChampion(rid: Long): VChampion {
		return this._idToChampion.get(rid.toString());
	}

	/**
	 * 销毁子弹
	 */
	public DestroyBullet(bullet: VBullet): void {
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
	public GetBullet(rid: Long): VBullet {
		return this._idToBullet.get(rid.toString());
	}

	private OnBattleInit(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		this.DecodeSync(reader);
	}

	private OnSnapshot(e: SyncEvent): void {
		const reader = $protobuf.Reader.create(e.data);
		this.DecodeSync(reader);
	}
}