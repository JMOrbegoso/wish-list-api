import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { DeleteWishStageCommand, DeleteWishStageHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish, WishStage, WishStageId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('delete-wish-stage', () => {
        const command = new DeleteWishStageCommand('id 0');

        it('delete a wish stage in a wish that does not exist should throw error', () => {
          // Arrange
          const wishRepository = {
            getWishByWishStageId: jest.fn().mockReturnValue(null),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new DeleteWishStageHandler(
            wishRepository,
            unitOfWork,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('delete a wish stage that not exist should throw error', () => {
          // Arrange
          const wishStageId = {
            equals: jest.fn().mockReturnValue(false),
          } as MockedObject<WishStageId>;

          const wishStage = {
            id: wishStageId as WishStageId,
          } as MockedObject<WishStage>;

          const wish = {
            stages: [wishStage] as MockedObject<WishStage[]>,
          } as MockedObject<Wish>;

          const wishRepository = {
            getWishByWishStageId: jest.fn().mockReturnValue(wish),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new DeleteWishStageHandler(
            wishRepository,
            unitOfWork,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('delete a wish stage that not exist should throw error', () => {
          // Arrange
          const wishStageId = {
            equals: jest.fn().mockReturnValue(true),
          } as MockedObject<WishStageId>;

          const wishStage = {
            id: wishStageId as WishStageId,
          } as MockedObject<WishStage>;

          const wish = {
            stages: [wishStage] as MockedObject<WishStage[]>,
            isDeleted: true,
          } as MockedObject<Wish>;

          const wishRepository = {
            getWishByWishStageId: jest.fn().mockReturnValue(wish),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new DeleteWishStageHandler(
            wishRepository,
            unitOfWork,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should call the method deleteWishStage from the WishRepository, the method commitChanges from the UnitOfWork', async () => {
          // Arrange
          const wishStageId = {
            value: command.id,
            equals: jest.fn().mockReturnValue(true),
          } as MockedObject<WishStageId>;

          const wishStage = {
            id: wishStageId as WishStageId,
          } as MockedObject<WishStage>;

          const wish = {
            id: { value: command.id },
            stages: [wishStage] as MockedObject<WishStage[]>,
            removeStage: jest.fn(),
            isDeleted: false,
          } as MockedObject<Wish>;

          const wishRepository = {
            getWishByWishStageId: jest.fn().mockReturnValue(wish),
            updateWish: jest.fn(),
            deleteWishStage: jest.fn(),
          } as MockedObject<WishRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new DeleteWishStageHandler(
            wishRepository,
            unitOfWork,
          );

          // Act
          await handler.execute(command);

          // Assert
          expect(wish.removeStage.mock.calls).toHaveLength(1);
          expect(wish.removeStage.mock.calls[0][0].id.value).toBe(
            wishStage.id.value,
          );
          expect(wishRepository.updateWish.mock.calls).toHaveLength(1);
          expect(wishRepository.updateWish.mock.calls[0][0].id.value).toBe(
            wish.id.value,
          );
          expect(wishRepository.deleteWishStage.mock.calls).toHaveLength(1);
          expect(wishRepository.deleteWishStage.mock.calls[0][0].value).toBe(
            wishStage.id.value,
          );
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
