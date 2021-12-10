import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { UpdateWishStageCommand, UpdateWishStageHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { Wish, WishStage } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new UpdateWishStageCommand(
    'wish-stage-id-0',
    'title 0',
    'description 0',
    [],
    [],
  ),
  new UpdateWishStageCommand(
    'wish-stage-id-1',
    'title 1',
    'description 1',
    ['https://www.example.com', 'https://www.example.net'],
    ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
  ),
  new UpdateWishStageCommand(
    'wish-stage-id-2',
    'title 2',
    'description 2',
    [],
    ['https://www.example.com/2.jpg', 'https://www.example.net/2.jpg'],
  ),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-wish-stage', () => {
        test.each(commands)(
          'update a wish stage in a wish that does not exist should throw error',
          (command: UpdateWishStageCommand) => {
            // Arrange
            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UpdateWishStageHandler(
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
          'update a wish stage that not exist should throw error',
          (command: UpdateWishStageCommand) => {
            // Arrange
            const wish = mocked<Wish>({
              stages: { find: jest.fn().mockReturnValue(false) },
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

            const handler = new UpdateWishStageHandler(
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
          'update a wish stage that not exist should throw error',
          (command: UpdateWishStageCommand) => {
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

            const handler = new UpdateWishStageHandler(
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
          'should call the method updateWishStage from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: UpdateWishStageCommand) => {
            // Arrange
            const wishStage = mocked<WishStage>({
              id: { getId: command.id },
              update: jest.fn(),
            } as unknown as WishStage);

            const wish = mocked<Wish>({
              id: { getId: 'id-0' },
              stages: { find: jest.fn().mockReturnValue(wishStage) },
              updateStage: jest.fn(),
              isDeleted: false,
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new UpdateWishStageHandler(
              wishRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.updateStage.mock.calls).toHaveLength(1);
            expect(wish.updateStage.mock.calls[0][0].getId).toBe(
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
