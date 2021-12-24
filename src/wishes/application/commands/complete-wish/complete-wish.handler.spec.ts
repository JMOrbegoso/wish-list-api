import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
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
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const wish = { isDeleted: true } as MockedObject<Wish>;

            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const wish = {
              isDeleted: false,
              isCompleted: true,
            } as MockedObject<Wish>;

            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const wish = {
              id: { getId: 'id' },
              isDeleted: false,
              isCompleted: false,
              complete: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

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
