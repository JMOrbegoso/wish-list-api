import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WisherEntity } from '../persistence/entities';
import { wisherEntityToWisher } from '.';

const validValues = [
  [{ id: 'id-0' } as MockedObject<WisherEntity>],
  [{ id: 'id-1' } as MockedObject<WisherEntity>],
  [{ id: 'id-2' } as MockedObject<WisherEntity>],
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('WisherEntity to Wisher', () => {
        test.each(validValues)(
          'should map Wisher to WisherEntity keeping all the property values',
          (wisherEntity: WisherEntity) => {
            // Arrange

            // Act
            const wisher = wisherEntityToWisher(wisherEntity);

            // Assert
            expect(wisher.id.getId).toBe(wisherEntity.id);
          },
        );
      });
    });
  });
});
