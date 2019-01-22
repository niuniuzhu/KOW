import * as util from './Util';
import * as arrays from './Arrays';
import Dictionary from './Dictionary';
export default class Set {
    constructor(toStringFunction) {
        this.dictionary = new Dictionary(toStringFunction);
    }
    contains(element) {
        return this.dictionary.containsKey(element);
    }
    add(element) {
        if (this.contains(element) || util.isUndefined(element)) {
            return false;
        }
        else {
            this.dictionary.setValue(element, element);
            return true;
        }
    }
    intersection(otherSet) {
        const set = this;
        this.forEach(function (element) {
            if (!otherSet.contains(element)) {
                set.remove(element);
            }
            return true;
        });
    }
    union(otherSet) {
        const set = this;
        otherSet.forEach(function (element) {
            set.add(element);
            return true;
        });
    }
    difference(otherSet) {
        const set = this;
        otherSet.forEach(function (element) {
            set.remove(element);
            return true;
        });
    }
    isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
            return false;
        }
        let isSub = true;
        this.forEach(function (element) {
            if (!otherSet.contains(element)) {
                isSub = false;
                return false;
            }
            return true;
        });
        return isSub;
    }
    remove(element) {
        if (!this.contains(element)) {
            return false;
        }
        else {
            this.dictionary.remove(element);
            return true;
        }
    }
    forEach(callback) {
        this.dictionary.forEach(function (k, v) {
            return callback(v);
        });
    }
    toArray() {
        return this.dictionary.values();
    }
    isEmpty() {
        return this.dictionary.isEmpty();
    }
    size() {
        return this.dictionary.size();
    }
    clear() {
        this.dictionary.clear();
    }
    toString() {
        return arrays.toString(this.toArray());
    }
}
