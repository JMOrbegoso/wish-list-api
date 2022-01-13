import { MockedObject } from 'ts-jest/dist/utils/testing';
import { Wisher } from '../../domain/entities';
import { wisherToWisherEntity } from '.';

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('wisher-to-wisher-entity', () => {
        it('should map Wisher to WisherEntity keeping all the property values', () => {
          // Arrange
          const wisher = { id: { value: 'id-0' } } as MockedObject<Wisher>;

          // Act
          const wisherEntity = wisherToWisherEntity(wisher);

          // Assert
          expect(wisherEntity.id).toBe(wisher.id.value);
        });
      });
    });
  });
});
