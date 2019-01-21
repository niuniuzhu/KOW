"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require("./util");
class Dictionary {
    constructor(toStrFunction) {
        this.table = {};
        this.nElements = 0;
        this.toStr = toStrFunction || util.defaultToString;
    }
    getValue(key) {
        const pair = this.table['$' + this.toStr(key)];
        if (util.isUndefined(pair)) {
            return undefined;
        }
        return pair.value;
    }
    setValue(key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return undefined;
        }
        let ret;
        const k = '$' + this.toStr(key);
        const previousElement = this.table[k];
        if (util.isUndefined(previousElement)) {
            this.nElements++;
            ret = undefined;
        }
        else {
            ret = previousElement.value;
        }
        this.table[k] = {
            key: key,
            value: value
        };
        return ret;
    }
    remove(key) {
        const k = '$' + this.toStr(key);
        const previousElement = this.table[k];
        if (!util.isUndefined(previousElement)) {
            delete this.table[k];
            this.nElements--;
            return previousElement.value;
        }
        return undefined;
    }
    keys() {
        const array = [];
        for (const name in this.table) {
            if (util.has(this.table, name)) {
                const pair = this.table[name];
                array.push(pair.key);
            }
        }
        return array;
    }
    values() {
        const array = [];
        for (const name in this.table) {
            if (util.has(this.table, name)) {
                const pair = this.table[name];
                array.push(pair.value);
            }
        }
        return array;
    }
    forEach(callback) {
        for (const name in this.table) {
            if (util.has(this.table, name)) {
                const pair = this.table[name];
                const ret = callback(pair.key, pair.value);
                if (ret === false) {
                    return;
                }
            }
        }
    }
    containsKey(key) {
        return !util.isUndefined(this.getValue(key));
    }
    clear() {
        this.table = {};
        this.nElements = 0;
    }
    size() {
        return this.nElements;
    }
    isEmpty() {
        return this.nElements <= 0;
    }
    toString() {
        let toret = '{';
        this.forEach((k, v) => {
            toret += `\n\t${k} : ${v}`;
        });
        return toret + '\n}';
    }
}
exports.default = Dictionary;
