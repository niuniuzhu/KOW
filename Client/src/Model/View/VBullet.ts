import { CDefs } from "../CDefs";
import { Defs } from "../Defs";
import { VEntity } from "./VEntity";

export class VBullet extends VEntity {
	protected LoadDefs(): void {
		this._defs = Defs.GetBullet(this._id);
		this._cdefs = CDefs.GetBullet(this._id);
	}
}