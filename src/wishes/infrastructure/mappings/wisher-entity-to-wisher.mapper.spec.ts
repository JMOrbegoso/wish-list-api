import { MockedObject } from 'ts-jest/dist/utils/testing';
import { WisherEntity } from '../persistence/entities';
import { wisherEntityToWisher } from '.';

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('WisherEntity to Wisher', () => {
        it('should map Wisher to WisherEntity keeping all the property values', () => {
          // Arrange
          const wisherEntity = { id: 'id-0' } as MockedObject<WisherEntity>;

          // Act
          const wisher = wisherEntityToWisher(wisherEntity);

          // Assert
          expect(wisher.id.value).toBe(wisherEntity.id);
        });
      });
    });
  });
});
