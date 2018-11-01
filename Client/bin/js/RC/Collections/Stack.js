define(["require", "exports", "./LinkedList"], function (require, exports, LinkedList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Stack {
        constructor() {
            this.list = new LinkedList_1.default();
        }
        push(elem) {
            return this.list.add(elem, 0);
        }
        add(elem) {
            return this.list.add(elem, 0);
        }
        pop() {
            return this.list.removeElementAtIndex(0);
        }
        peek() {
            return this.list.first();
        }
        size() {
            return this.list.size();
        }
        contains(elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        }
        isEmpty() {
            return this.list.isEmpty();
        }
        clear() {
            this.list.clear();
        }
        forEach(callback) {
            this.list.forEach(callback);
        }
    }
    exports.default = Stack;
});
//# sourceMappingURL=Stack.js.map