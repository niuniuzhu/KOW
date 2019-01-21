"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    static get utcTime() {
        let d1 = new Date();
        return new Date(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds(), d1.getUTCMilliseconds()).getTime();
    }
    static ToLocalTimeString(utc) {
        let d1 = new Date(utc);
        let d2 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds(), d1.getMilliseconds());
        return d2.toLocaleString();
    }
}
exports.Timer = Timer;
