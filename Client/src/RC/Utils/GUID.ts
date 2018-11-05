export class GUID {

	public static validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");

	public static EMPTY = "00000000-0000-0000-0000-000000000000";

	public static isGuid(guid: any) {
		const value: string = guid.toString();
		return guid && (guid instanceof GUID || GUID.validator.test(value));
	}

	public static create(): GUID {
		return new GUID([GUID.gen(2), GUID.gen(1), GUID.gen(1), GUID.gen(1), GUID.gen(3)].join("-"));
	}

	public static createEmpty(): GUID {
		return new GUID("emptyguid");
	}

	public static parse(guid: string): GUID {
		return new GUID(guid);
	}

	public static raw(): string {
		return [GUID.gen(2), GUID.gen(1), GUID.gen(1), GUID.gen(1), GUID.gen(3)].join("-");
	}

	private static gen(count: number) {
		let out: string = "";
		for (let i: number = 0; i < count; i++) {
			// tslint:disable-next-line:no-bitwise
			out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
		}
		return out;
	}

	private value: string;

	private constructor(guid: string) {
		if (!guid) { throw new TypeError("Invalid argument; `value` has no value."); }

		this.value = GUID.EMPTY;

		if (guid && GUID.isGuid(guid)) {
			this.value = guid;
		}
	}

	public equals(other: GUID): boolean {
		// Comparing string `value` against provided `guid` will auto-call
		// toString on `guid` for comparison
		return GUID.isGuid(other) && this.value === other.toString();
	}

	public isEmpty(): boolean {
		return this.value === GUID.EMPTY;
	}

	public toString(): string {
		return this.value;
	}

	public toJSON(): any {
		return {
			value: this.value,
		};
	}
}

