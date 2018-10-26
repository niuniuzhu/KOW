import { GraphEdge } from "./GraphEdge";
import { MathUtils } from "../../Math/MathUtils";
import { Dictionary, PriorityQueue } from "../../Collections/index";
export class GraphSearcher {
    static MazeSearch(graph, start, maxStep, rndFunc) {
        let visitedNodes = [];
        let edges = [];
        let curStep = 0;
        let node = graph.GetNodeAt(start);
        while (node != null) {
            if (maxStep >= 0 && curStep == maxStep)
                break;
            visitedNodes.push(node.index);
            edges.splice(0);
            let allVisited = true;
            for (let edge of node.edges) {
                if (visitedNodes.indexOf(edge.to) < 0) {
                    allVisited = false;
                    edges.push(edge);
                }
            }
            if (allVisited)
                break;
            let edge = edges[MathUtils.Floor(rndFunc(0, edges.length))];
            node = graph.GetNodeAt(edge.to);
            ++curStep;
        }
        return visitedNodes;
    }
    static PrimSearch(graph, start) {
        let shortestPathPredecessors = [];
        let visitedNodes = new Set();
        let nodeQueue = new PriorityQueue(GraphEdge.Compare);
        let node = graph.GetNodeAt(start);
        while (node != null) {
            visitedNodes.add(node.index);
            for (let edge of node.edges)
                nodeQueue.enqueue(edge);
            let edage = nodeQueue.dequeue();
            while (edage != null && visitedNodes.has(edage.to)) {
                edage = nodeQueue.dequeue();
            }
            if (edage == null)
                break;
            shortestPathPredecessors.push(edage);
            node = graph.GetNodeAt(edage.to);
        }
        return shortestPathPredecessors;
    }
    static AStarSearch(graph, start, end) {
        let shortestPathPredecessors = new Dictionary();
        let frontierPredecessors = new Dictionary();
        let nodeQueue = new PriorityQueue(NumberPair.NumberCompare);
        let costToNode = new Dictionary();
        costToNode.setValue(start, 0);
        frontierPredecessors.setValue(start, null);
        nodeQueue.enqueue(new NumberPair(start, 0));
        while (nodeQueue.size() > 0) {
            let nextClosestNode = nodeQueue.dequeue();
            let predecessor = frontierPredecessors.getValue(nextClosestNode.first);
            shortestPathPredecessors.setValue(nextClosestNode.first, predecessor);
            if (end == nextClosestNode.first)
                break;
            let edages = graph.GetNodeAt(nextClosestNode.first).edges;
            for (let edge of edages) {
                let totalCost = costToNode.getValue(nextClosestNode.first) + edge.cost;
                let estimatedTotalCostViaNode = totalCost + 0;
                if (!frontierPredecessors.containsKey(edge.to)) {
                    costToNode.setValue(edge.to, totalCost);
                    frontierPredecessors.setValue(edge.to, edge);
                    nodeQueue.enqueue(new NumberPair(edge.to, estimatedTotalCostViaNode));
                }
                else if (totalCost < costToNode.getValue(edge.to) &&
                    !shortestPathPredecessors.containsKey(edge.to)) {
                    costToNode.setValue(edge.to, totalCost);
                    frontierPredecessors.setValue(edge.to, edge);
                    nodeQueue.forEach((element) => {
                        if (element.first == edge.to) {
                            element.second = estimatedTotalCostViaNode;
                            return;
                        }
                    });
                    nodeQueue.update();
                }
            }
        }
        let pathList = [];
        for (let node = end; shortestPathPredecessors.getValue(node) != null; node = shortestPathPredecessors.getValue(node).from)
            pathList.push(node);
        pathList.push(start);
        pathList.reverse();
        return pathList;
    }
}
export class NumberPair {
    constructor(first, second) {
        this.first = first;
        this.second = second;
    }
    static NumberCompare(a, b) {
        if (a.second > b.second) {
            return -1;
        }
        if (a.second < b.second) {
            return 1;
        }
        return 0;
    }
}
