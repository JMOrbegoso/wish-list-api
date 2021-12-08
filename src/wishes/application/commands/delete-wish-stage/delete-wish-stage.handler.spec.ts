import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { DeleteWishStageCommand, DeleteWishStageHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
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
            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
            const wish = mocked<Wish>({
              stages: { find: jest.fn().mockReturnValue(false) },
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
            const wishStage = mocked<WishStage>({} as unknown as WishStage);

            const wish = mocked<Wish>({
              stages: { find: jest.fn().mockReturnValue(wishStage) },
              isDeleted: true,
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
          'should call the method DeleteWishStage from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: DeleteWishStageCommand) => {
            // Arrange
            const wishStage = mocked<WishStage>({
              id: { getId: command.id },
            } as unknown as WishStage);

            const wish = mocked<Wish>({
              stages: { find: jest.fn().mockReturnValue(wishStage) },
              isDeleted: false,
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
              deleteWishStage: jest.fn(),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new DeleteWishStageHandler(
              wishRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wishRepository.deleteWishStage.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.deleteWishStage.mock.calls[0][0].getId).toBe(
              wishStage.id.getId,
            );
          },
        );
      });
    });
  });
});