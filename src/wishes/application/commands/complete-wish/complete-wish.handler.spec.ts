import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { CompleteWishCommand, CompleteWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new CompleteWishCommand('id 0', 1),
  new CompleteWishCommand('id 1', 2),
  new CompleteWishCommand('id 2', 3),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('complete-wish', () => {
        test.each(commands)(
          'complete a wish that does not exist should throw error',
          (command: CompleteWishCommand) => {
            // Arrange
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new CompleteWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'complete a deleted wish should throw error',
          (command: CompleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({ isDeleted: true } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new CompleteWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'complete a already completed wish should throw error',
          (command: CompleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              isDeleted: false,
              isCompleted: true,
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new CompleteWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: CompleteWishCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              id: { getId: 'id' },
              isDeleted: false,
              isCompleted: false,
              complete: jest.fn(),
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new CompleteWishHandler(wishRepository, unitOfWork);

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.complete.mock.calls).toHaveLength(1);
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
