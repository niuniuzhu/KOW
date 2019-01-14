import { Battle } from "./Battle";
import { Hashtable } from "../../RC/Utils/Hashtable";
import { FVec2 } from "../../RC/FMath/FVec2";

export class HPPacket {
	private _battle: Battle;
	private _maxHpPacket: number;
	private _hpPacketRefreshInerval: number;//int32
	private _time: number;

	constructor(battle: Battle) {
		this._battle = battle;
	}

	public Init(defs: Hashtable): void {
		this._maxHpPacket = Hashtable.GetNumber(defs, "max_hp_packet");
		this._hpPacketRefreshInerval = Hashtable.GetNumber(defs, "hp_packet_refresh_interval");
		this._time = 0;
	}

	public Update(dt: number): void {
		while (this._time >= this._hpPacketRefreshInerval) {
			this._time -= this._hpPacketRefreshInerval;

			const item = this._battle.CreateSceneItem(0);
			const rndx = this._battle.random.NextFloor(this._battle.bounds.xMin + item.radius, this._battle.bounds.xMax - item.radius);
			const rndy = this._battle.random.NextFloor(this._battle.bounds.yMin + item.radius, this._battle.bounds.yMax - item.radius);
			item.position.Set(rndx, rndy);
		}
		this._time += dt;
	}
}