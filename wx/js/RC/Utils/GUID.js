"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GUID {
    constructor(guid) {
        if (!guid) {
            throw new TypeError("Invalid argument; `value` has no value.");
        }
        this.value = GUID.EMPTY;
        if (guid && GUID.isGuid(guid)) {
            this.value = guid;
        }
    }
    static isGuid(guid) {
        const value = guid.toString();
        return guid && (guid instanceof GUID || GUID.validator.test(value));
    }
    static create() {
        return new GUID([GUID.gen(2), GUID.gen(1), GUID.gen(1), GUID.gen(1), GUID.gen(3)].join("-"));
    }
    static createEmpty() {
        return new GUID("emptyguid");
    }
    static parse(guid) {
        return new GUID(guid);
    }
    static raw() {
        return [GUID.gen(2), GUID.gen(1), GUID.gen(1), GUID.gen(1), GUID.gen(3)].join("-");
    }
    static gen(count) {
        let out = "";
        for (let i = 0; i < count; i++) {
            out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return out;
    }
    equals(other) {
        return GUID.isGuid(other) && this.value === other.toString();
    }
    isEmpty() {
        return this.value === GUID.EMPTY;
    }
    toString() {
        return this.value;
    }
    toJSON() {
        return {
            value: this.value,
        };
    }
}
GUID.validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");
GUID.EMPTY = "00000000-0000-0000-0000-000000000000";
exports.GUID = GUID;
