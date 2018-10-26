import { Vec3 } from "./Vec3";

import { Mat3 } from "./Mat3";

export class Line3 {
	public point1: Vec3;
	public point2: Vec3;

	constructor(point1: Vec3 = Vec3.zero, point2: Vec3 = Vec3.zero) {
		this.point1 = point1;
		this.point2 = point2;
	}

	public Transform(matrix: Mat3): Line3 {
		return new Line3(matrix.Transform(this.point1), matrix.Transform(this.point2));
	}

	public Length(): number {
		return Vec3.Sub(this.point1, this.point2).Magnitude();
	}

	public InersectPlane(planeNormal: Vec3, planeLocation: Vec3): Vec3 {
		let dot = -(planeNormal.x * planeLocation.x) - planeNormal.y * planeLocation.y - planeNormal.z * planeLocation.z;
		let dot3 = planeNormal.x * (this.point2.x - this.point1.x) + planeNormal.y * (this.point2.y - this.point1.y) +
			planeNormal.z * (this.point2.z - this.point1.z);
		let dot2 =
			-((dot + planeNormal.x * this.point1.x + planeNormal.y * this.point1.y + planeNormal.z * this.point1.z) / dot3);
		return Vec3.Add(this.point1, Vec3.MulN(Vec3.Sub(this.point2, this.point1), dot2));
	}

	public static InersectPlane(line: Line3, planeNormal: Vec3, planeLocation: Vec3): Vec3 {
		let dot = -(planeNormal.x * planeLocation.x) - planeNormal.y * planeLocation.y - planeNormal.z * planeLocation.z;
		let dot3 = planeNormal.x * (line.point2.x - line.point1.x) + planeNormal.y * (line.point2.y - line.point1.y) +
			planeNormal.z * (line.point2.z - line.point1.z);
		let dot2 =
			-((dot + planeNormal.x * line.point1.x + planeNormal.y * line.point1.y + planeNormal.z * line.point1.z) / dot3);
		return Vec3.Add(line.point1, Vec3.MulN(Vec3.Sub(line.point2, line.point1), dot2));
	}

	public Inersect(line: Line3): Line3 {
		let vector = Vec3.Sub(this.point1, line.point1);
		let vector2 = Vec3.Sub(line.point2, line.point1);
		let vector3 = Vec3.Sub(this.point2, this.point1);
		let dot1 = vector.Dot(vector2);
		let dot2 = vector2.Dot(vector3);
		let dot3 = vector.Dot(vector3);
		let dot4 = vector2.SqrMagnitude();
		let dot5 = vector3.SqrMagnitude();
		let mul1 = (dot1 * dot2 - dot3 * dot4) / (dot5 * dot4 - dot2 * dot2);
		let mul2 = (dot1 + dot2 * mul1) / dot4;
		return new Line3(Vec3.Add(this.point1, Vec3.MulN(vector3, mul1)), Vec3.Add(line.point1, Vec3.MulN(vector2, mul2)));
	}

	public static Equals(l1: Line3, l2: Line3): boolean {
		if (l1 == null || l2 == null)
			return false;
		return (l1.point1.EqualsTo(l2.point1) && l1.point2.EqualsTo(l2.point2));
	}

	public EqualsTo(l: Line3): boolean {
		return Line3.Equals(this, l);
	}
}