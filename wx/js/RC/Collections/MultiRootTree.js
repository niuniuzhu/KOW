var Direction;
(function (Direction) {
    Direction[Direction["BEFORE"] = 0] = "BEFORE";
    Direction[Direction["AFTER"] = 1] = "AFTER";
    Direction[Direction["INSIDE_AT_END"] = 2] = "INSIDE_AT_END";
    Direction[Direction["INSIDE_AT_START"] = 3] = "INSIDE_AT_START";
})(Direction || (Direction = {}));
export default class MultiRootTree {
    constructor(rootIds = [], nodes = {}) {
        this.rootIds = rootIds;
        this.nodes = nodes;
        this.initRootIds();
        this.initNodes();
    }
    initRootIds() {
        for (let rootId of this.rootIds) {
            this.createEmptyNodeIfNotExist(rootId);
        }
    }
    initNodes() {
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                for (let nodeListItem of this.nodes[nodeKey]) {
                    this.createEmptyNodeIfNotExist(nodeListItem);
                }
            }
        }
    }
    createEmptyNodeIfNotExist(nodeKey) {
        if (!this.nodes[nodeKey]) {
            this.nodes[nodeKey] = [];
        }
    }
    getRootIds() {
        let clone = this.rootIds.slice();
        return clone;
    }
    getNodes() {
        let clone = {};
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                clone[nodeKey] = this.nodes[nodeKey].slice();
            }
        }
        return clone;
    }
    getObject() {
        return {
            rootIds: this.getRootIds(),
            nodes: this.getNodes(),
        };
    }
    toObject() {
        return this.getObject();
    }
    flatten() {
        const _this = this;
        let extraPropsObject = [];
        for (let i = 0; i < this.rootIds.length; i++) {
            const rootId = this.rootIds[i];
            extraPropsObject.push({
                id: rootId,
                level: 0,
                hasParent: false,
                childrenCount: 0,
            });
            traverse(rootId, this.nodes, extraPropsObject, 0);
        }
        for (let o of extraPropsObject) {
            o.childrenCount = countChildren(o.id);
        }
        return extraPropsObject;
        function countChildren(id) {
            if (!_this.nodes[id]) {
                return 0;
            }
            else {
                const childrenCount = _this.nodes[id].length;
                return childrenCount;
            }
        }
        function traverse(startId, nodes, returnArray, level = 0) {
            if (!startId || !nodes || !returnArray || !nodes[startId]) {
                return;
            }
            level++;
            let idsList = nodes[startId];
            for (let i = 0; i < idsList.length; i++) {
                let id = idsList[i];
                returnArray.push({ id, level, hasParent: true });
                traverse(id, nodes, returnArray, level);
            }
            level--;
        }
    }
    moveIdBeforeId(moveId, beforeId) {
        return this.moveId(moveId, beforeId, Direction.BEFORE);
    }
    moveIdAfterId(moveId, afterId) {
        return this.moveId(moveId, afterId, Direction.AFTER);
    }
    moveIdIntoId(moveId, insideId, atStart = true) {
        if (atStart) {
            return this.moveId(moveId, insideId, Direction.INSIDE_AT_START);
        }
        else {
            return this.moveId(moveId, insideId, Direction.INSIDE_AT_END);
        }
    }
    swapRootIdWithRootId(rootId, withRootId) {
        let leftIndex = this.findRootId(rootId);
        let rightIndex = this.findRootId(withRootId);
        this.swapRootPositionWithRootPosition(leftIndex, rightIndex);
    }
    swapRootPositionWithRootPosition(swapRootPosition, withRootPosition) {
        let temp = this.rootIds[withRootPosition];
        this.rootIds[withRootPosition] = this.rootIds[swapRootPosition];
        this.rootIds[swapRootPosition] = temp;
    }
    deleteId(id) {
        this.rootDeleteId(id);
        this.nodeAndSubNodesDelete(id);
        this.nodeRefrencesDelete(id);
    }
    insertIdBeforeId(beforeId, insertId) {
        let foundRootIdIndex = this.findRootId(beforeId);
        if (foundRootIdIndex > -1) {
            this.insertIdIntoRoot(insertId, foundRootIdIndex);
        }
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                let foundNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                if (foundNodeIdIndex > -1) {
                    this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex);
                }
            }
        }
    }
    insertIdAfterId(belowId, insertId) {
        let foundRootIdIndex = this.findRootId(belowId);
        if (foundRootIdIndex > -1) {
            this.insertIdIntoRoot(insertId, foundRootIdIndex + 1);
        }
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                let foundNodeIdIndex = this.findNodeId(nodeKey, belowId);
                if (foundNodeIdIndex > -1) {
                    this.insertIdIntoNode(nodeKey, insertId, foundNodeIdIndex + 1);
                }
            }
        }
    }
    insertIdIntoId(insideId, insertId) {
        this.nodeInsertAtEnd(insideId, insertId);
        this.nodes[insertId] = [];
    }
    insertIdIntoRoot(id, position) {
        if (position === undefined) {
            this.rootInsertAtEnd(id);
        }
        else {
            if (position < 0) {
                const length = this.rootIds.length;
                this.rootIds.splice((position + length + 1), 0, id);
            }
            else {
                this.rootIds.splice(position, 0, id);
            }
        }
        this.nodes[id] = this.nodes[id] || [];
    }
    insertIdIntoNode(nodeKey, id, position) {
        this.nodes[nodeKey] = this.nodes[nodeKey] || [];
        this.nodes[id] = this.nodes[id] || [];
        if (position === undefined) {
            this.nodeInsertAtEnd(nodeKey, id);
        }
        else {
            if (position < 0) {
                const length = this.nodes[nodeKey].length;
                this.nodes[nodeKey].splice((position + length + 1), 0, id);
            }
            else {
                this.nodes[nodeKey].splice(position, 0, id);
            }
        }
    }
    moveId(moveId, beforeId, direction) {
        let sourceId = moveId;
        const sourceRootIndex = this.findRootId(sourceId);
        let sourceNodeKey;
        let sourceNodeIdIndex;
        if (this.nodes[beforeId]) {
            sourceNodeKey = beforeId;
        }
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                sourceNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                break;
            }
        }
        let targetId = beforeId;
        let targetRootIndex = this.findRootId(targetId);
        let targetNodeKey;
        let targetNodeIdIndex;
        if (this.nodes[beforeId]) {
            targetNodeKey = beforeId;
        }
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                targetNodeIdIndex = this.findNodeId(nodeKey, beforeId);
                break;
            }
        }
        if (sourceRootIndex > -1) {
            if (targetRootIndex > -1) {
                this.rootDelete(sourceRootIndex);
                if (targetRootIndex > sourceRootIndex) {
                    targetRootIndex--;
                }
                else {
                }
                switch (direction) {
                    case Direction.BEFORE:
                        this.insertIdIntoRoot(sourceId, targetRootIndex);
                        break;
                    case Direction.AFTER:
                        this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                        break;
                    case Direction.INSIDE_AT_START:
                        this.nodeInsertAtStart(targetId, sourceId);
                        break;
                    case Direction.INSIDE_AT_END:
                        this.nodeInsertAtEnd(targetId, sourceId);
                        break;
                }
            }
            else {
                this.rootDelete(sourceRootIndex);
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        let index = this.findNodeId(nodeKey, targetId);
                        if (index > -1) {
                            switch (direction) {
                                case Direction.BEFORE:
                                    this.insertIdIntoNode(nodeKey, sourceId, index);
                                    break;
                                case Direction.AFTER:
                                    this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                    break;
                                case Direction.INSIDE_AT_START:
                                    this.nodeInsertAtStart(targetId, sourceId);
                                    break;
                                case Direction.INSIDE_AT_END:
                                    this.nodeInsertAtEnd(targetId, sourceId);
                                    break;
                            }
                            break;
                        }
                    }
                }
            }
        }
        else {
            if (targetRootIndex > -1) {
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        let index = this.findNodeId(nodeKey, sourceId);
                        if (index > -1) {
                            this.nodeDeleteAtIndex(nodeKey, index);
                            break;
                        }
                    }
                }
                switch (direction) {
                    case Direction.BEFORE:
                        this.insertIdIntoRoot(sourceId, targetRootIndex);
                        break;
                    case Direction.AFTER:
                        this.insertIdIntoRoot(sourceId, targetRootIndex + 1);
                        break;
                    case Direction.INSIDE_AT_START:
                        this.nodeInsertAtStart(targetId, sourceId);
                        break;
                    case Direction.INSIDE_AT_END:
                        this.nodeInsertAtEnd(targetId, sourceId);
                        break;
                }
            }
            else {
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        let index = this.findNodeId(nodeKey, sourceId);
                        if (index > -1) {
                            this.nodeDeleteAtIndex(nodeKey, index);
                            break;
                        }
                    }
                }
                for (let nodeKey in this.nodes) {
                    if (this.nodes.hasOwnProperty(nodeKey)) {
                        let index = this.findNodeId(nodeKey, targetId);
                        if (index > -1) {
                            switch (direction) {
                                case Direction.BEFORE:
                                    this.insertIdIntoNode(nodeKey, sourceId, index);
                                    break;
                                case Direction.AFTER:
                                    this.insertIdIntoNode(nodeKey, sourceId, index + 1);
                                    break;
                                case Direction.INSIDE_AT_START:
                                    this.nodeInsertAtStart(targetId, sourceId);
                                    break;
                                case Direction.INSIDE_AT_END:
                                    this.nodeInsertAtEnd(targetId, sourceId);
                                    break;
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    swapArrayElements(arr, indexA, indexB) {
        var temp = arr[indexA];
        arr[indexA] = arr[indexB];
        arr[indexB] = temp;
        return arr;
    }
    rootDeleteId(id) {
        let index = this.findRootId(id);
        if (index > -1) {
            this.rootDelete(index);
        }
    }
    nodeAndSubNodesDelete(nodeKey) {
        let toDeleteLater = [];
        for (let i = 0; i < this.nodes[nodeKey].length; i++) {
            let id = this.nodes[nodeKey][i];
            this.nodeAndSubNodesDelete(id);
            toDeleteLater.push(nodeKey);
        }
        this.nodeDelete(nodeKey);
        for (let i = 0; i < toDeleteLater.length; i++) {
            this.nodeDelete(toDeleteLater[i]);
        }
    }
    nodeRefrencesDelete(id) {
        for (let nodeKey in this.nodes) {
            if (this.nodes.hasOwnProperty(nodeKey)) {
                for (let i = 0; i < this.nodes[nodeKey].length; i++) {
                    let targetId = this.nodes[nodeKey][i];
                    if (targetId === id) {
                        this.nodeDeleteAtIndex(nodeKey, i);
                    }
                }
            }
        }
    }
    nodeDelete(nodeKey) {
        delete this.nodes[nodeKey];
    }
    findRootId(id) {
        return this.rootIds.indexOf(id);
    }
    findNodeId(nodeKey, id) {
        return this.nodes[nodeKey].indexOf(id);
    }
    findNode(nodeKey) {
        return this.nodes[nodeKey];
    }
    nodeInsertAtStart(nodeKey, id) {
        this.nodes[nodeKey].unshift(id);
    }
    nodeInsertAtEnd(nodeKey, id) {
        this.nodes[nodeKey].push(id);
    }
    rootDelete(index) {
        this.rootIds.splice(index, 1);
    }
    nodeDeleteAtIndex(nodeKey, index) {
        this.nodes[nodeKey].splice(index, 1);
    }
    rootInsertAtStart(id) {
        this.rootIds.unshift(id);
    }
    rootInsertAtEnd(id) {
        this.rootIds.push(id);
    }
}
