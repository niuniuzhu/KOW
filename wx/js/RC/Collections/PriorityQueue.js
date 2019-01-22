import Heap from "./Heap";
import { util } from "./index";
export default class PriorityQueue {
    constructor(compareFunction) {
        this.heap = new Heap(util.reverseCompareFunction(compareFunction));
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
