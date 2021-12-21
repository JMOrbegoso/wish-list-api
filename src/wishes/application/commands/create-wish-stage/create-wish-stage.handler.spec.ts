import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { CreateWishStageCommand, CreateWishStageHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

const commands = [
  new CreateWishStageCommand(
    'id 0',
    'wish id 0',
    'title 0',
    'description 0',
    [],
    [],
  ),
  new CreateWishStageCommand(
    'id 1',
    'wish id 1',
    'title 1',
    'description 1',
    ['https://www.example.com', 'https://www.example.net'],
    ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
  ),
  new CreateWishStageCommand(
    'id 2',
    'wish id 2',
    'title 2',
    'description 2',
    [],
    ['https://www.example.com/2.jpg', 'https://www.example.net/2.jpg'],
  ),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('create-wish-stage', () => {
        test.each(commands)(
          'creating a wish stage in an id that already exist should throw error',
          (command: CreateWishStageCommand) => {
            // Arrange
            const wishRepository = {
              getWishStageById: jest.fn().mockReturnValue(true),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishStageHandler(
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
          'create a wish stage in a wish that does not exist should throw error',
          (command: CreateWishStageCommand) => {
            // Arrange
            const wishRepository = {
              getWishStageById: jest.fn().mockReturnValue(null),
              getOne: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishStageHandler(
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
          'create a wish stage in a deleted wish should throw error',
          (command: CreateWishStageCommand) => {
            // Arrange
            const wish = {
              id: {
                getId: 'id',
              },
              isDeleted: true,
            } as MockedObject<Wish>;

            const wishRepository = {
              getWishStageById: jest.fn().mockReturnValue(null),
              getOne: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishStageHandler(
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
          'create a wish stage in a wish with the max number of stages should throw error',
          (command: CreateWishStageCommand) => {
            // Arrange
            const wish = {
              id: {
                getId: 'id',
              },
              isDeleted: false,
              stages: { length: Wish.MaxStages },
            } as MockedObject<Wish>;

            const wishRepository = {
              getWishStageById: jest.fn().mockReturnValue(null),
              getOne: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishStageHandler(
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
          async (command: CreateWishStageCommand) => {
            // Arrange
            const wish = {
              id: {
                getId: command.wishId,
              },
              isDeleted: false,
              stages: { length: 1 },
              addStage: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getWishStageById: jest.fn().mockReturnValue(null),
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new CreateWishStageHandler(
              wishRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.addStage.mock.calls).toHaveLength(1);
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
