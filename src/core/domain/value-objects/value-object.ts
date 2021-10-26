import { deepEqual } from '../../helpers';

export abstract class ValueObject<T> {
	public readonly value: T;

	protected constructor(value: T) {
		this.validate(value);
		this.value = Object.freeze(value);
	}

	abstract validate(value: T): void;

	public equals(other?: ValueObject<T>): boolean {
		if (other === null || other === undefined) {
			return false;
		}

		if (other.value === undefined) {
			return false;
		}

		return deepEqual(this.value, other.value);
	}
}
