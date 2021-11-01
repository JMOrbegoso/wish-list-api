import { UniqueId } from '..';
import { v4 as createUuid } from 'uuid';

describe('unique-id', () => {
  it('should create a valid unique id', () => {
    // Arrange

    // Act
    const uniqueId = UniqueId.create(undefined);

    // Assert
    expect(uniqueId.value).not.toBeUndefined();
  });

  it('should create a valid unique id', () => {
    // Arrange

    // Act
    const uniqueId = UniqueId.create(null);

    // Assert
    expect(uniqueId.value).not.toBeNull();
  });

  it('should create a valid unique id', () => {
    // Arrange

    // Act
    const uniqueId = UniqueId.create('');

    // Assert
    expect(uniqueId.value).not.toBeNull();
  });

  it('should create a valid unique id', () => {
    // Arrange

    // Act
    const id = createUuid();
    const uniqueId = UniqueId.create(id);

    // Assert
    expect(uniqueId.value).toBe(id);
  });

  it('both unique ids should be different', () => {
    // Arrange

    // Act
    const uuid = createUuid();
    const uniqueId = UniqueId.create(uuid);
    const result = uniqueId.equals(undefined);

    // Assert
    expect(result).toBe(false);
  });

  it('both unique ids should be different', () => {
    // Arrange

    // Act
    const uuid = createUuid();
    const uniqueId = UniqueId.create(uuid);
    const result = uniqueId.equals(null);

    // Assert
    expect(result).toBe(false);
  });

  it('both unique ids should be different', () => {
    // Arrange

    // Act
    const uuid_1 = createUuid();
    const uuid_2 = createUuid();
    const uniqueId_1 = UniqueId.create(uuid_1);
    const uniqueId_2 = UniqueId.create(uuid_2);
    const result = uniqueId_1.equals(uniqueId_2);

    // Assert
    expect(result).toBe(false);
  });

  it('both value objects should be equal', () => {
    // Arrange

    // Act
    const uuid = createUuid();
    const uniqueId_1 = UniqueId.create(uuid);
    const uniqueId_2 = UniqueId.create(uuid);
    const result = uniqueId_1.equals(uniqueId_2);

    // Assert
    expect(result).toBe(true);
  });
});
