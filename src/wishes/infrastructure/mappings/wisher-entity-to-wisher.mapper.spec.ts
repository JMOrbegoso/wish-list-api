import { mocked } from 'ts-jest/utils';
import { WisherEntity } from '../persistence/entities';
import { wisherEntityToWisher } from '.';

const validValues = [
  [mocked<WisherEntity>({ id: 'id-0' } as unknown as WisherEntity)],
  [mocked<WisherEntity>({ id: 'id-1' } as unknown as WisherEntity)],
  [mocked<WisherEntity>({ id: 'id-2' } as unknown as WisherEntity)],
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
