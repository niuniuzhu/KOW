export class Logger {
    static Log(message) {
        console.log(message);
    }
    static Warn(message) {
        console.warn(message);
    }
    static Error(message) {
        console.error(message);
    }
    static Info(message) {
        console.info(message);
    }
    static Debug(message) {
        console.debug(message);
    }
    static Trace(message) {
        console.trace(message);
    }
    static Assert(condition, message) {
        console.assert(condition, message);
    }
    static Exception(message) {
        console.exception(message);
    }
}
