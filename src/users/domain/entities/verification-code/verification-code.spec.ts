import { MockedObject } from 'ts-jest/dist/utils/testing';
import { mocked } from 'ts-jest/utils';
import { VerificationCode } from '..';
import { UniqueId } from '../../../../shared/domain/value-objects';

const validValues = [
  [
    mocked<UniqueId>({
      getId: 'id-0',
      equals: jest.fn(),
    } as unknown as UniqueId),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-1',
      equals: jest.fn(),
    } as unknown as UniqueId),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-2',
      equals: jest.fn(),
    } as unknown as UniqueId),
  ],
  [
    mocked<UniqueId>({
      getId: 'id-3',
      equals: jest.fn(),
    } as unknown as UniqueId),
  ],
];

describe('users', () => {
  describe('domain', () => {
    describe('entities', () => {
      describe('verification-code', () => {
        test.each(validValues)(
          'should create a VerificationCode with [id: %p]',
          (uniqueId: MockedObject<UniqueId>) => {
            // Arrange

            // Act
            const verificationCode = VerificationCode.create(uniqueId);

            // Assert
            expect(verificationCode.id.getId).toBe(uniqueId.getId);
          },
        );

        test.each(validValues)(
          'comparing two entities should call "equals" method from UniqueId',
          (uniqueId: MockedObject<UniqueId>) => {
            // Arrange
            const verificationCode = VerificationCode.create(uniqueId);

            // Act
            verificationCode.equals(verificationCode);

            // Assert
            expect(uniqueId.equals.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
