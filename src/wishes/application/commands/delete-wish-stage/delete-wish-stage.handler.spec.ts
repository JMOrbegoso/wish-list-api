import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { DeleteWishStageCommand, DeleteWishStageHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { Wish, WishStage } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new DeleteWishStageCommand('id 0'),
  new DeleteWishStageCommand('id 1'),
  new DeleteWishStageCommand('id 2'),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('delete-wish-stage', () => {
        test.each(commands)(
          'delete a wish stage in a wish that does not exist should throw error',
          (command: DeleteWishStageCommand) => {
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
          },
        );

        test.each(commands)(
          'delete a wish stage that not exist should throw error',
          (command: DeleteWishStageCommand) => {
            // Arrange
            const uniqueId = {
              equals: jest.fn().mockReturnValue(false),
            } as MockedObject<UniqueId>;

            const wishStage = {
              id: uniqueId as UniqueId,
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
          },
        );

        test.each(commands)(
          'delete a wish stage that not exist should throw error',
          (command: DeleteWishStageCommand) => {
            // Arrange
            const uniqueId = {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;

            const wishStage = {
              id: uniqueId as UniqueId,
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
          },
        );

        test.each(commands)(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: DeleteWishStageCommand) => {
            // Arrange
            const uniqueId = {
              getId: command.id,
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;

            const wishStage = {
              id: uniqueId as UniqueId,
            } as MockedObject<WishStage>;

            const wish = {
              id: { getId: command.id },
              stages: [wishStage] as MockedObject<WishStage[]>,
              removeStage: jest.fn(),
              isDeleted: false,
            } as MockedObject<Wish>;

            const wishRepository = {
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
              updateWish: jest.fn(),
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
            expect(wish.removeStage.mock.calls[0][0].id.getId).toBe(
              wishStage.id.getId,
            );
            expect(wishRepository.updateWish.mock.calls).toHaveLength(1);
            expect(wishRepository.updateWish.mock.calls[0][0].id.getId).toBe(
              wish.id.getId,
            );
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
