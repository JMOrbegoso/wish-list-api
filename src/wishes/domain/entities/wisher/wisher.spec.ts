import { MockedObject } from 'ts-jest/dist/utils/testing';
import { Wisher } from '..';
import { UniqueId } from '../../../../shared/domain/value-objects';

const validValues = [
  [
    {
      getId: 'id-0',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
  ],
  [
    {
      getId: 'id-1',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
  ],
  [
    {
      getId: 'id-2',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
  ],
  [
    {
      getId: 'id-3',
      equals: jest.fn(),
    } as MockedObject<UniqueId>,
  ],
];

describe('wishes', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('wisher', () => {
        test.each(validValues)(
          'should create a Wisher with [id: %p]',
          (uniqueId: MockedObject<UniqueId>) => {
            // Arrange

            // Act
            const wisher = Wisher.create(uniqueId);

            // Assert
            expect(wisher.id.getId).toBe(uniqueId.getId);
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (uniqueId: MockedObject<UniqueId>) => {
            // Arrange
            const wisher = Wisher.create(uniqueId);

            // Act
            wisher.equals(wisher);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
