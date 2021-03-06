import * as util from './Util';
import Dictionary from './Dictionary';
import Set from './Set';
export default class Bag {
    constructor(toStrFunction) {
        this.toStrF = toStrFunction || util.defaultToString;
        this.dictionary = new Dictionary(this.toStrF);
        this.nElements = 0;
    }
    add(element, nCopies = 1) {
        if (util.isUndefined(element) || nCopies <= 0) {
            return false;
        }
        if (!this.contains(element)) {
            const node = {
                value: element,
                copies: nCopies
            };
            this.dictionary.setValue(element, node);
        }
        else {
            this.dictionary.getValue(element).copies += nCopies;
        }
        this.nElements += nCopies;
        return true;
    }
    count(element) {
        if (!this.contains(element)) {
            return 0;
        }
        else {
            return this.dictionary.getValue(element).copies;
        }
    }
    contains(element) {
        return this.dictionary.containsKey(element);
    }
    remove(element, nCopies = 1) {
        if (util.isUndefined(element) || nCopies <= 0) {
            return false;
        }
        if (!this.contains(element)) {
            return false;
        }
        else {
            const node = this.dictionary.getValue(element);
            if (nCopies > node.copies) {
                this.nElements -= node.copies;
            }
            else {
                this.nElements -= nCopies;
            }
            node.copies -= nCopies;
            if (node.copies <= 0) {
                this.dictionary.remove(element);
            }
            return true;
        }
    }
    toArray() {
        const a = [];
        const values = this.dictionary.values();
        for (const node of values) {
            const element = node.value;
            const copies = node.copies;
            for (let j = 0; j < copies; j++) {
                a.push(element);
            }
        }
        return a;
    }
    toSet() {
        const toret = new Set(this.toStrF);
        const elements = this.dictionary.values();
        for (const ele of elements) {
            const value = ele.value;
            toret.add(value);
        }
        return toret;
    }
    forEach(callback) {
        this.dictionary.forEach(function (k, v) {
            const value = v.value;
            const copies = v.copies;
            for (let i = 0; i < copies; i++) {
                if (callback(value) === false) {
                    return false;
                }
            }
            return true;
        });
    }
    size() {
        return this.nElements;
    }
    isEmpty() {
        return this.nElements === 0;
    }
    clear() {
        this.nElements = 0;
        this.dictionary.clear();
    }
}
