import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { UncompleteWishCommand, UncompleteWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new UncompleteWishCommand('id 0'),
  new UncompleteWishCommand('id 1'),
  new UncompleteWishCommand('id 2'),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('uncomplete-wish', () => {
        test.each(commands)(
          'uncomplete a wish that does not exist should throw error',
          (command: UncompleteWishCommand) => {
            // Arrange
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UncompleteWishHandler(
              wishRepository,
              unitOfWork,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'uncomplete a deleted wish should throw error',
          (command: UncompleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({ isDeleted: true } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UncompleteWishHandler(
              wishRepository,
              unitOfWork,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'uncomplete a not completed wish should throw error',
          (command: UncompleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              isDeleted: false,
              isCompleted: false,
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UncompleteWishHandler(
              wishRepository,
              unitOfWork,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: UncompleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              id: { getId: 'id' },
              isDeleted: false,
              isCompleted: true,
              uncomplete: jest.fn(),
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new UncompleteWishHandler(
              wishRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.uncomplete.mock.calls).toHaveLength(1);
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
