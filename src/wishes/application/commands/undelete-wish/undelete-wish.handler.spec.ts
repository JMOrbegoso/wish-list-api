import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UndeleteWishCommand, UndeleteWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
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
            const wishRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

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
            const wish = {
              isDeleted: false,
            } as unknown as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

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
            const wish = {
              id: { getId: 'id' },
              isDeleted: true,
              undelete: jest.fn(),
            } as unknown as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as unknown as MockedObject<UnitOfWork>;

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
