import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Wish } from 'src/wishes/domain/entities';
import { mocked } from 'ts-jest/utils';
import { UndeleteWishCommand, UndeleteWishHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new UndeleteWishCommand('id 0'),
  new UndeleteWishCommand('id 1'),
  new UndeleteWishCommand('id 2'),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('undelete-wish', () => {
        test.each(commands)(
          'undelete a wish that does not exist should throw error',
          (command: UndeleteWishCommand) => {
            // Arrange
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UndeleteWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'undelete a not deleted wish should throw error',
          (command: UndeleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              isDeleted: false,
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UndeleteWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: UndeleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              id: { getId: 'id' },
              isDeleted: true,
              undelete: jest.fn(),
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new UndeleteWishHandler(wishRepository, unitOfWork);

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.undelete.mock.calls).toHaveLength(1);
            expect(wishRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.update.mock.calls[0][0].id.getId).toBe(
              wish.id.getId,
            );
          },
        );
      });
    });
  });
});
