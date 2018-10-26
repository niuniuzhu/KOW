import * as util from './util';
import Dictionary from './Dictionary';
import * as arrays from './arrays';
export default class MultiDictionary {
    constructor(toStrFunction, valuesEqualsFunction, allowDuplicateValues = false) {
        this.dict = new Dictionary(toStrFunction);
        this.equalsF = valuesEqualsFunction || util.defaultEquals;
        this.allowDuplicate = allowDuplicateValues;
    }
    getValue(key) {
        const values = this.dict.getValue(key);
        if (util.isUndefined(values)) {
            return [];
        }
        return arrays.copy(values);
    }
    setValue(key, value) {
        if (util.isUndefined(key) || util.isUndefined(value)) {
            return false;
        }
        if (!this.containsKey(key)) {
            this.dict.setValue(key, [value]);
            return true;
        }
        const array = this.dict.getValue(key);
        if (!this.allowDuplicate) {
            if (arrays.contains(array, value, this.equalsF)) {
                return false;
            }
        }
        array.push(value);
        return true;
    }
    remove(key, value) {
        if (util.isUndefined(value)) {
            const v = this.dict.remove(key);
            return !util.isUndefined(v);
        }
        const array = this.dict.getValue(key);
        if (arrays.remove(array, value, this.equalsF)) {
            if (array.length === 0) {
                this.dict.remove(key);
            }
            return true;
        }
        return false;
    }
    keys() {
        return this.dict.keys();
    }
    values() {
        const values = this.dict.values();
        const array = [];
        for (const v of values) {
            for (const w of v) {
                array.push(w);
            }
        }
        return array;
    }
    containsKey(key) {
        return this.dict.containsKey(key);
    }
    clear() {
        this.dict.clear();
    }
    size() {
        return this.dict.size();
    }
    isEmpty() {
        return this.dict.isEmpty();
    }
}
