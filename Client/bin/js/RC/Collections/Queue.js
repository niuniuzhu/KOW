define(["require", "exports", "./LinkedList"], function (require, exports, LinkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Queue {
        constructor() {
            this.list = new LinkedList_1.default();
        }
        enqueue(elem) {
            return this.list.add(elem);
        }
        add(elem) {
            return this.list.add(elem);
        }
        dequeue() {
            if (this.list.size() !== 0) {
                const el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        }
        peek() {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        }
        size() {
            return this.list.size();
        }
        contains(elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        }
        isEmpty() {
            return this.list.size() <= 0;
        }
        clear() {
            this.list.clear();
        }
        forEach(callback) {
            this.list.forEach(callback);
        }
    }
    exports.default = Queue;
});
//# sourceMappingURL=Queue.js.map