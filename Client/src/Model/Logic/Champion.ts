import { Entity } from "./Entity";
import { EntityType } from "../EntityType";

export class Champion extends Entity {
	public get type(): EntityType { return EntityType.Champion; }
}