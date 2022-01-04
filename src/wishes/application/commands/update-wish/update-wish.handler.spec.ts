import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UpdateWishCommand, UpdateWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new UpdateWishCommand('id 0', 'title 0', 'description 0', [], [], []),
  new UpdateWishCommand(
    'id 1',
    'title 1',
    'description 2',
    ['https://wwww.example.com/1'],
    [],
    ['tech'],
  ),
  new UpdateWishCommand(
    'id 2',
    'title 2',
    'description 2',
    ['https://wwww.example.com/2'],
    ['https://wwww.example.com/2.jpg'],
    ['tech'],
  ),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-wish', () => {
        test.each(commands)(
          'update a wish that does not exist should throw error',
          (command: UpdateWishCommand) => {
            // Arrange
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new UpdateWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'update a deleted wish should throw error',
          (command: UpdateWishCommand) => {
            // Arrange
            const wish = { isDeleted: true } as MockedObject<Wish>;

            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new UpdateWishHandler(wishRepository, unitOfWork);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: UpdateWishCommand) => {
            // Arrange
            const wish = {
              id: { getId: 'id' },
              isDeleted: false,
              update: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(wish),
              updateWish: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new UpdateWishHandler(wishRepository, unitOfWork);

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.update.mock.calls).toHaveLength(1);
            expect(wishRepository.updateWish.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.updateWish.mock.calls[0][0].id.getId).toBe(
              wish.id.getId,
            );
          },
        );
      });
    });
  });
});
