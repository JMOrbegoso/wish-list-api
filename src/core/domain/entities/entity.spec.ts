import { Entity } from './entity';
import { UniqueId } from '../unique-id';
import { v4 as uuidv4 } from 'uuid';

describe('entities', () => {
	class ProductEntity extends Entity {
		public price: number;

		private constructor(id: UniqueId, price: number) {
			super(id);

			this.price = price;
		}

		static create(id: UniqueId, price: number): ProductEntity {
			return new ProductEntity(id, price);
		}
	}

	it('created product entity should store the values', () => {
		// Arrange

		// Act
		const uuid = uuidv4();
		const id = UniqueId.create(uuid);
		const price = 40;
		const product = ProductEntity.create(id, price);

		// Assert
		expect(product.id.value).toBe(uuid);
		expect(product.price).toBe(price);
	});

	it('both entities should be different', () => {
		// Arrange

		// Act
		const uuid_1 = uuidv4();
		const uuid_2 = uuidv4();
		const id_1 = UniqueId.create(uuid_1);
		const id_2 = UniqueId.create(uuid_2);
		const price = 40;
		const product_1 = ProductEntity.create(id_1, price);
		const product_2 = ProductEntity.create(id_2, price);
		const result = product_1.equals(product_2);

		// Assert
		expect(result).toBe(false);
	});

	it('both entities should be different', () => {
		// Arrange

		// Act
		const uuid = uuidv4();
		const id = UniqueId.create(uuid);
		const price = 20;
		const product = ProductEntity.create(id, price);
		const result = product.equals(undefined);

		// Assert
		expect(result).toBe(false);
	});

	it('both entities should be different', () => {
		// Arrange

		// Act
		const uuid = uuidv4();
		const id = UniqueId.create(uuid);
		const price = 20;
		const product = ProductEntity.create(id, price);
		const result = product.equals(null);

		// Assert
		expect(result).toBe(false);
	});

	it('both entities should be equal', () => {
		// Arrange

		// Act
		const uuid = uuidv4();
		const id = UniqueId.create(uuid);
		const price_1 = 40;
		const price_2 = 80;
		const product_1 = ProductEntity.create(id, price_1);
		const product_2 = ProductEntity.create(id, price_2);
		const result = product_1.equals(product_2);

		// Assert
		expect(result).toBe(true);
	});
});
