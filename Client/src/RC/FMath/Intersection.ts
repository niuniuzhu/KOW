import { FMathUtils } from "./FMathUtils";
import { FVec2 } from "./FVec2";

export enum IntersectionType {
	Outside,
	Inside,
	Cling
}

export class Intersection {
	/**
	 * 圆的相交性检测
	 * @param center0 移动圆的中心位置
	 * @param radius0 移动圆的半径
	 * @param center1 静止圆的中心位置
	 * @param radius1 静止圆的半径
	 * @param radius1 
	 */
	public static IntersectsCC(center0: FVec2, radius0: number, center1: FVec2, radius1: number): IntersectionType {
		const a = FVec2.Sub(center1, center0).SqrMagnitude();
		let r = FMathUtils.Add(radius0, radius1);
		r = FMathUtils.Mul(r, r);
		if (a > r)
			return IntersectionType.Outside;
		if (a < r)
			return IntersectionType.Inside;
		return IntersectionType.Cling;
	}

	/**
	 * 移动圆和静态圆的碰撞检测
	 * @param mCenter 移动圆的中心位置
	 * @param mRadius 移动圆的半径
	 * @param sCenter 静止圆的中心位置
	 * @param sRadius 静止圆的半径
	 * @param direction 移动方向(正规化)
	 */
	public static IntersectsMovingCC(mCenter: FVec2, mRadius: number, sCenter: FVec2, sRadius: number, direction: FVec2): number {
		const e = FVec2.Sub(sCenter, mCenter);
		const r = FMathUtils.Add(mRadius, sRadius);
		const rSqrt = FMathUtils.Mul(r, r);
		//距离小于半径和,已经相交了
		// if (e.SqrMagnitude() < rSqrt)
		// 	return 0;
		const edotd = e.Dot(direction);
		const edote = e.Dot(e);
		//用二次求根公式解t
		const s = FMathUtils.Add(FMathUtils.Sub(FMathUtils.Mul(edotd, edotd), edote), rSqrt);
		//根号内为负值,t无解,即不会发生碰撞
		if (s < 0)
			return -1;
		//解出t值为发生碰撞的时间
		const t = FMathUtils.Sub(edotd, FMathUtils.Sqrt(s));
		return t * 1000;
	}
}