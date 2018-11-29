import { Entity } from "./Entity";
import { EntityType } from "../EntityType";
export class Champion extends Entity {
    get type() { return EntityType.Champion; }
}
