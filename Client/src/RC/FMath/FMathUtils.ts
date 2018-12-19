import Decimal from "../../Libs/decimal";

export class FMathUtils {
	public static readonly D_ZERO: Decimal = new Decimal(0);
	public static readonly D_ONE: Decimal = new Decimal(1);
	public static readonly D_TWO: Decimal = new Decimal(2);
	public static readonly D_THREE: Decimal = new Decimal(3);
	public static readonly D_FOUR: Decimal = new Decimal(4);
	public static readonly D_FIVE: Decimal = new Decimal(5);
	public static readonly D_HALF: Decimal = new Decimal(0.5);
	public static readonly D_N_ONE: Decimal = new Decimal(-1);
	public static readonly D_SMALL: Decimal = new Decimal(0.01);
	public static readonly D_SMALL1: Decimal = new Decimal(0.001);
	public static readonly D_BIG: Decimal = new Decimal(0xffffffff);
}