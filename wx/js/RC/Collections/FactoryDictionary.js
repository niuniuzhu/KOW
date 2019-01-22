import Dictionary from './Dictionary';
import * as util from './Util';
export default class FactoryDictionary extends Dictionary {
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
