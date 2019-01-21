"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Heap_1 = require("./Heap");
const index_1 = require("./index");
class PriorityQueue {
    constructor(compareFunction) {
        this.heap = new Heap_1.default(index_1.util.reverseCompareFunction(compareFunction));
    }
    enqueue(element) {
        return this.heap.add(element);
    }
    add(element) {
        return this.heap.add(element);
    }
    dequeue() {
        if (this.heap.size() !== 0) {
            const el = this.heap.peek();
            this.heap.removeRoot();
            return el;
        }
        return undefined;
    }
    peek() {
        return this.heap.peek();
    }
    contains(element) {
        return this.heap.contains(element);
    }
    isEmpty() {
        return this.heap.isEmpty();
    }
    size() {
        return this.heap.size();
    }
    clear() {
        this.heap.clear();
    }
    forEach(callback) {
        this.heap.forEach(callback);
    }
    update() {
        this.heap.update();
    }
}
exports.default = PriorityQueue;
