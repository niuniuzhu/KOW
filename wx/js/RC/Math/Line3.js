"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vec3_1 = require("./Vec3");
class Line3 {
    constructor(point1 = Vec3_1.Vec3.zero, point2 = Vec3_1.Vec3.zero) {
        this.point1 = point1;
        this.point2 = point2;
    }
    Transform(matrix) {
        return new Line3(matrix.Transform(this.point1), matrix.Transform(this.point2));
    }
    Length() {
        return Vec3_1.Vec3.Sub(this.point1, this.point2).Magnitude();
    }
    InersectPlane(planeNormal, planeLocation) {
        let dot = -(planeNormal.x * planeLocation.x) - planeNormal.y * planeLocation.y - planeNormal.z * planeLocation.z;
        let dot3 = planeNormal.x * (this.point2.x - this.point1.x) + planeNormal.y * (this.point2.y - this.point1.y) +
            planeNormal.z * (this.point2.z - this.point1.z);
        let dot2 = -((dot + planeNormal.x * this.point1.x + planeNormal.y * this.point1.y + planeNormal.z * this.point1.z) / dot3);
        return Vec3_1.Vec3.Add(this.point1, Vec3_1.Vec3.MulN(Vec3_1.Vec3.Sub(this.point2, this.point1), dot2));
    }
    static InersectPlane(line, planeNormal, planeLocation) {
        let dot = -(planeNormal.x * planeLocation.x) - planeNormal.y * planeLocation.y - planeNormal.z * planeLocation.z;
        let dot3 = planeNormal.x * (line.point2.x - line.point1.x) + planeNormal.y * (line.point2.y - line.point1.y) +
            planeNormal.z * (line.point2.z - line.point1.z);
        let dot2 = -((dot + planeNormal.x * line.point1.x + planeNormal.y * line.point1.y + planeNormal.z * line.point1.z) / dot3);
        return Vec3_1.Vec3.Add(line.point1, Vec3_1.Vec3.MulN(Vec3_1.Vec3.Sub(line.point2, line.point1), dot2));
    }
    Inersect(line) {
        let vector = Vec3_1.Vec3.Sub(this.point1, line.point1);
        let vector2 = Vec3_1.Vec3.Sub(line.point2, line.point1);
        let vector3 = Vec3_1.Vec3.Sub(this.point2, this.point1);
        let dot1 = vector.Dot(vector2);
        let dot2 = vector2.Dot(vector3);
        let dot3 = vector.Dot(vector3);
        let dot4 = vector2.SqrMagnitude();
        let dot5 = vector3.SqrMagnitude();
        let mul1 = (dot1 * dot2 - dot3 * dot4) / (dot5 * dot4 - dot2 * dot2);
        let mul2 = (dot1 + dot2 * mul1) / dot4;
        return new Line3(Vec3_1.Vec3.Add(this.point1, Vec3_1.Vec3.MulN(vector3, mul1)), Vec3_1.Vec3.Add(line.point1, Vec3_1.Vec3.MulN(vector2, mul2)));
    }
    static Equals(l1, l2) {
        if (l1 == null || l2 == null)
            return false;
        return (l1.point1.EqualsTo(l2.point1) && l1.point2.EqualsTo(l2.point2));
    }
    EqualsTo(l) {
        return Line3.Equals(this, l);
    }
}
exports.Line3 = Line3;
