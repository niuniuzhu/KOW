export class BaseBattleEvent {
    get type() {
        return this.__type;
    }
    set _type(value) {
        this.__type = value;
    }
}
