import { deepEqual } from './deepEqual';

describe('helpers', () => {
	describe('deepEqual', () => {
		it('should return true', () => {
			// Arrange
			const object_1 = {};
			const object_2 = {};

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(true);
		});

		it('should return true', () => {
			// Arrange
			const object_1 = { firstName: 'Jhon', lastName: 'Doe' };
			const object_2 = { firstName: 'Jhon', lastName: 'Doe' };

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(true);
		});

		it('should return true', () => {
			// Arrange
			const object_1 = { firstName: 'Jhon', lastName: 'Doe', age: 25 };
			const object_2 = { firstName: 'Jhon', lastName: 'Doe', age: 25 };

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(true);
		});

		it('should return true', () => {
			// Arrange
			const object_1 = { names: ['Jhon', 'Doe'], age: 25 };
			const object_2 = { names: ['Jhon', 'Doe'], age: 25 };

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(true);
		});

		it('should return true', () => {
			// Arrange
			const object_1 = {
				fullName: { firstName: 'Jhon', lastName: 'Doe' },
				age: 25,
			};
			const object_2 = {
				fullName: { firstName: 'Jhon', lastName: 'Doe' },
				age: 25,
			};

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(true);
		});

		it('should return false', () => {
			// Arrange
			const object_1 = { firstName: 'Jhon', lastName: 'Doe' };
			const object_2 = { firstName: 'Jhon' };

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(false);
		});

		it('should return false', () => {
			// Arrange
			const object_1 = { firstName: 'Jhon', lastName: 'Doe', age: 25 };
			const object_2 = { firstName: 'Jhon', lastName: 'Doe' };

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(false);
		});

		it('should return false', () => {
			// Arrange
			const object_1 = { names: ['Jhon', 'Doe'], age: 25 };
			const object_2 = { names: ['Jhon'], age: 25 };

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(false);
		});

		it('should return false', () => {
			// Arrange
			const object_1 = {
				fullName: { firstName: 'Jhon', lastName: 'Doe' },
				age: 25,
			};
			const object_2 = {
				fullName: { firstName: 'Jhon' },
				age: 25,
			};

			// Act
			const result = deepEqual(object_1, object_2);

			// Assert
			expect(result).toBe(false);
		});
	});
});
