import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UpdateWishStageCommand, UpdateWishStageHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
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
            const wishRepository = {
              getWishByWishStageId: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const uniqueId = {
              getId: command.id,
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<UniqueId>;

            const wishStage = {
              id: uniqueId as UniqueId,
              update: jest.fn(),
            } as MockedObject<WishStage>;

            const wish = {
              id: { getId: command.id },
              stages: [wishStage] as MockedObject<WishStage[]>,
              updateStage: jest.fn(),
              isDeleted: false,
            } as MockedObject<Wish>;

            const wishRepository = {
              getWishByWishStageId: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

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
