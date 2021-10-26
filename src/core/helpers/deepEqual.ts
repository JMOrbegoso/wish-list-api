export function deepEqual<T>(object1: T, object2: T): boolean {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		const val1 = object1[key];
		const val2 = object2[key];

		if (isObject(val1) && isObject(val2)) {
			if (!deepEqual(val1, val2)) return false;
		} else {
			if (val1 !== val2) return false;
		}
	}

	return true;
}

function isObject(object): boolean {
	return object != null && typeof object === 'object';
}
