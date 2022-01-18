import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { CreateWishStageCommand, CreateWishStageHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('create-wish-stage', () => {
        const command = new CreateWishStageCommand(
          'id 3',
          'wish id 3',
          'title 3',
          'description 3',
          [],
          [],
        );

        it('creating a wish stage in an id that already exist should throw error', () => {
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
        });

        it('create a wish stage in a wish that does not exist should throw error', () => {
          // Arrange
          const wishRepository = {
            getWishStageById: jest.fn().mockReturnValue(null),
            getOneById: jest.fn().mockReturnValue(null),
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
        });

        it('create a wish stage in a deleted wish should throw error', () => {
          // Arrange
          const wish = {
            id: {
              value: 'id',
            },
            isDeleted: true,
          } as MockedObject<Wish>;

          const wishRepository = {
            getWishStageById: jest.fn().mockReturnValue(null),
            getOneById: jest.fn().mockReturnValue(wish),
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
        });

        it('create a wish stage in a wish with the max number of stages should throw error', () => {
          // Arrange
          const wish = {
            id: {
              value: 'id',
            },
            isDeleted: false,
            stages: { length: Wish.MaxStages },
          } as MockedObject<Wish>;

          const wishRepository = {
            getWishStageById: jest.fn().mockReturnValue(null),
            getOneById: jest.fn().mockReturnValue(wish),
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
        });

        test.each([
          new CreateWishStageCommand(
            'id 0',
            'wish id 0',
            'title 0',
            'description 0',
            ['https://www.example.com', 'https://www.example.net'],
            ['https://www.example.com/0.jpg', 'https://www.example.net/0.jpg'],
          ),
          new CreateWishStageCommand(
            'id 1',
            'wish id 1',
            'title 1',
            'description 1',
            ['https://www.example.com', 'https://www.example.net'],
            [],
          ),
          new CreateWishStageCommand(
            'id 2',
            'wish id 2',
            'title 2',
            'description 2',
            [],
            ['https://www.example.com/2.jpg', 'https://www.example.net/2.jpg'],
          ),
          new CreateWishStageCommand(
            'id 3',
            'wish id 3',
            'title 3',
            'description 3',
            [],
            [],
          ),
        ])(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: CreateWishStageCommand) => {
            // Arrange
            const wish = {
              id: {
                value: command.wishId,
              },
              isDeleted: false,
              stages: { length: 1 },
              addStage: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getWishStageById: jest.fn().mockReturnValue(null),
              getOneById: jest.fn().mockReturnValue(wish),
              updateWish: jest.fn(),
              addWishStage: jest.fn(),
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
            expect(wishRepository.updateWish.mock.calls).toHaveLength(1);
            expect(wishRepository.updateWish.mock.calls[0][0].id.value).toBe(
              wish.id.value,
            );
            expect(wishRepository.addWishStage.mock.calls).toHaveLength(1);
            expect(wishRepository.addWishStage.mock.calls[0][0].id.value).toBe(
              command.id,
            );
            expect(wishRepository.addWishStage.mock.calls[0][1].value).toBe(
              command.wishId,
            );
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
