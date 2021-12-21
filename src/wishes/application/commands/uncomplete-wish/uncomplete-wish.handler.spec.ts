import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
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
            const wishRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const wish = { isDeleted: true } as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const wish = {
              isDeleted: false,
              isCompleted: false,
            } as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const wish = {
              id: { getId: 'id' },
              isDeleted: false,
              isCompleted: true,
              uncomplete: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

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
