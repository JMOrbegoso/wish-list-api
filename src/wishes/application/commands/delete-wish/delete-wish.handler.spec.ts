import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { DeleteWishCommand, DeleteWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('delete-wish', () => {
        const command = new DeleteWishCommand('id 0');

        it('delete a wish that does not exist should throw error', () => {
          // Arrange
          const wishRepository = {
            getOneById: jest.fn().mockReturnValue(null),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new DeleteWishHandler(wishRepository, unitOfWork);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('delete an already deleted wish should throw error', () => {
          // Arrange
          const wish = {
            isDeleted: true,
          } as MockedObject<Wish>;

          const wishRepository = {
            getOneById: jest.fn().mockReturnValue(wish),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new DeleteWishHandler(wishRepository, unitOfWork);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should call the method update from the WishRepository, the method commitChanges from the UnitOfWork', async () => {
          // Arrange
          const wish = {
            id: { value: 'id' },
            isDeleted: false,
            delete: jest.fn(),
          } as MockedObject<Wish>;

          const wishRepository = {
            getOneById: jest.fn().mockReturnValue(wish),
            updateWish: jest.fn(),
          } as MockedObject<WishRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new DeleteWishHandler(wishRepository, unitOfWork);

          // Act
          await handler.execute(command);

          // Assert
          expect(wish.delete.mock.calls).toHaveLength(1);
          expect(wishRepository.updateWish.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          expect(wishRepository.updateWish.mock.calls[0][0].id.value).toBe(
            wish.id.value,
          );
        });
      });
    });
  });
});
