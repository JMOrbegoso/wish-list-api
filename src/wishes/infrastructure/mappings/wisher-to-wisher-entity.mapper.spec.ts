import { mocked } from 'ts-jest/utils';
import { Wisher } from '../../domain/entities';
import { wisherToWisherEntity } from '.';

const validValues = [
  [mocked<Wisher>({ id: { getId: 'id-0' } } as unknown as Wisher)],
  [mocked<Wisher>({ id: { getId: 'id-1' } } as unknown as Wisher)],
  [mocked<Wisher>({ id: { getId: 'id-2' } } as unknown as Wisher)],
];

describe('wishes', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('wisher-to-wisher-entity', () => {
        test.each(validValues)(
          'should map Wisher to WisherEntity keeping all the property values',
          (wisher: Wisher) => {
            // Arrange

            // Act
            const wisherEntity = wisherToWisherEntity(wisher);

            // Assert
            expect(wisherEntity.id).toBe(wisher.id.getId);
          },
        );
      });
    });
  });
});