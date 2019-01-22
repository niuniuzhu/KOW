import { default as Dictionary } from './Dictionary';
import * as util from './Util';
class LinkedDictionaryPair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
    unlink() {
        this.prev.next = this.next;
        this.next.prev = this.prev;
    }
}
export default class LinkedDictionary extends Dictionary {
    constructor(toStrFunction) {
        super(toStrFunction);
        this.head = new LinkedDictionaryPair(null, null);
        this.tail = new LinkedDictionaryPair(null, null);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    appendToTail(entry) {
        const lastNode = this.tail.prev;
        lastNode.next = entry;
        entry.prev = lastNode;
        entry.next = this.tail;
        this.tail.prev = entry;
    }
    getLinkedDictionaryPair(key) {
        if (util.isUndefined(key)) {
            return undefined;
        }
        const k = '$' + this.toStr(key);
        const pair = (this.table[k]);
        return pair;
    }
    getValue(key) {
        const pair = this.getLinkedDictionaryPair(key);
        if (!util.isUndefined(pair)) {
            return pair.value;
        }
        return undefined;
    }
    remove(key) {
        const pair = this.getLinkedDictionaryPair(key);
        if (!util.isUndefined(pair)) {
            super.remove(key);
            pair.unlink();
            return pair.value;
        }
        return undefined;
    }
    clear() {
        super.clear();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
    replace(oldPair, newPair) {
        const k = '$' + this.toStr(newPair.key);
        newPair.next = oldPair.next;
        newPair.prev = oldPair.prev;
        this.remove(oldPair.key);
        newPair.prev.next = newPair;
        newPair.next.prev = newPair;
        this.table[k] = newPair;
        ++this.nElements;
    }
    setValue(key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return undefined;
        }
        const existingPair = this.getLinkedDictionaryPair(key);
        const newPair = new LinkedDictionaryPair(key, value);
        const k = '$' + this.toStr(key);
        if (!util.isUndefined(existingPair)) {
            this.replace(existingPair, newPair);
            return existingPair.value;
        }
        else {
            this.appendToTail(newPair);
            this.table[k] = newPair;
            ++this.nElements;
            return undefined;
        }
    }
    keys() {
        const array = [];
        this.forEach((key, value) => {
            array.push(key);
        });
        return array;
    }
    values() {
        const array = [];
        this.forEach((key, value) => {
            array.push(value);
        });
        return array;
    }
    forEach(callback) {
        let crawlNode = this.head.next;
        while (crawlNode.next != null) {
            const ret = callback(crawlNode.key, crawlNode.value);
            if (ret === false) {
                return;
            }
            crawlNode = crawlNode.next;
        }
    }
}
