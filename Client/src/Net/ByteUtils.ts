export class ByteUtils {

	public static Encode8u(p: Uint8Array, offset: number, c: number): number {
		p[0 + offset] = c;
		return 1;
	}

	public static Encode16u(p: Uint8Array, offset: number, w: number): number {
		p[0 + offset] = w >> 0;
		p[1 + offset] = w >> 8;
		return 2;
	}

	public static Encode32u(p: Uint8Array, offset: number, value: number): number {
		p[0 + offset] = value >> 0;
		p[1 + offset] = value >> 8;
		p[2 + offset] = value >> 16;
		p[3 + offset] = value >> 24;
		return 4;
	}

	public static Encode64u(p: Uint8Array, offset: number, value: number): number {
		let l0 = value & 0xffffffff;
		let l1 = value >> 32;
		let offset2 = ByteUtils.Encode32u(p, offset, l0);
		ByteUtils.Encode32u(p, offset + offset2, l1);
		return 8;
	}

	public static Decode8u(p: Uint8Array, offset: number): number {
		return p[0 + offset];
	}

	public static Decode16u(p: Uint8Array, offset: number): number {
		let result = 0;
		result |= p[0 + offset];
		result |= p[1 + offset] << 8;
		return result;
	}

	public static Decode32u(p: Uint8Array, offset: number): number {
		let result = 0;
		result |= p[0 + offset];
		result |= p[1 + offset] << 8;
		result |= p[2 + offset] << 16;
		result |= p[3 + offset] << 24;
		return result;
	}

	public static Decode64u(p: Uint8Array, offset: number): number {
		let l0 = ByteUtils.Decode32u(p, offset);
		offset += 4;
		let l1 = ByteUtils.Decode32u(p, offset + offset);
		return l0 | (l1 << 32);
	}
}