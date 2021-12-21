import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { DeleteWishStageCommand, DeleteWishStageHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
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
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

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
            const wish = {
              stages: { find: jest.fn().mockReturnValue(false) },
            } as unknown as MockedObject<Wish>;

            const wishRepository = {
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

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
            const wishStage = {} as unknown as MockedObject<WishStage>;

            const wish = {
              stages: { find: jest.fn().mockReturnValue(wishStage) },
              isDeleted: true,
            } as unknown as MockedObject<Wish>;

            const wishRepository = {
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

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
            const wishStage = {
              id: { getId: command.id },
            } as unknown as MockedObject<WishStage>;

            const wish = {
              id: { getId: command.id },
              stages: { find: jest.fn().mockReturnValue(wishStage) },
              removeStage: jest.fn(),
              isDeleted: false,
            } as unknown as MockedObject<Wish>;

            const wishRepository = {
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as unknown as MockedObject<UnitOfWork>;

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
            expect(wishRepository.update.mock.calls).toHaveLength(1);
            expect(wishRepository.update.mock.calls[0][0].id.getId).toBe(
              wish.id.getId,
            );
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
