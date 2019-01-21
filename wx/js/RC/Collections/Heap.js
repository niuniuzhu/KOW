"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const collections = require("./util");
const arrays = require("./arrays");
class Heap {
    constructor(compareFunction) {
        this.data = [];
        this.compare = compareFunction || collections.defaultCompare;
    }
    leftChildIndex(nodeIndex) {
        return (2 * nodeIndex) + 1;
    }
    rightChildIndex(nodeIndex) {
        return (2 * nodeIndex) + 2;
    }
    parentIndex(nodeIndex) {
        return Math.floor((nodeIndex - 1) / 2);
    }
    minIndex(leftChild, rightChild) {
        if (rightChild >= this.data.length) {
            if (leftChild >= this.data.length) {
                return -1;
            }
            else {
                return leftChild;
            }
        }
        else {
            if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                return leftChild;
            }
            else {
                return rightChild;
            }
        }
    }
    siftUp(index) {
        let parent = this.parentIndex(index);
        while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
            arrays.swap(this.data, parent, index);
            index = parent;
            parent = this.parentIndex(index);
        }
    }
    siftDown(nodeIndex) {
        let min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
        while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
            arrays.swap(this.data, min, nodeIndex);
            nodeIndex = min;
            min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
        }
    }
    peek() {
        if (this.data.length > 0) {
            return this.data[0];
        }
        else {
            return undefined;
        }
    }
    add(element) {
        if (collections.isUndefined(element)) {
            return undefined;
        }
        this.data.push(element);
        this.siftUp(this.data.length - 1);
        return true;
    }
    removeRoot() {
        if (this.data.length > 0) {
            const obj = this.data[0];
            this.data[0] = this.data[this.data.length - 1];
            this.data.splice(this.data.length - 1, 1);
            if (this.data.length > 0) {
                this.siftDown(0);
            }
            return obj;
        }
        return undefined;
    }
    contains(element) {
        const equF = collections.compareToEquals(this.compare);
        return arrays.contains(this.data, element, equF);
    }
    size() {
        return this.data.length;
    }
    isEmpty() {
        return this.data.length <= 0;
    }
    clear() {
        this.data.length = 0;
    }
    forEach(callback) {
        arrays.forEach(this.data, callback);
    }
    update() {
        if (this.data.length > 0)
            this.siftDown(0);
    }
}
exports.default = Heap;
