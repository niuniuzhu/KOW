"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Dictionary_1 = require("./Dictionary");
const util = require("./util");
class FactoryDictionary extends Dictionary_1.default {
    constructor(defaultFactoryFunction, toStrFunction) {
        super(toStrFunction);
        this.defaultFactoryFunction = defaultFactoryFunction;
    }
    setDefault(key, defaultValue) {
        const currentValue = super.getValue(key);
        if (util.isUndefined(currentValue)) {
            this.setValue(key, defaultValue);
            return defaultValue;
        }
        return currentValue;
    }
    getValue(key) {
        return this.setDefault(key, this.defaultFactoryFunction());
    }
}
exports.default = FactoryDictionary;
