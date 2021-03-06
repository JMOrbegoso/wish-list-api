import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UpdateWishCommand, UpdateWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-wish', () => {
        const command = new UpdateWishCommand(
          'id 0',
          'title 0',
          'description 0',
          PrivacyLevel.Public,
          [],
          [],
          [],
        );

        it('update a wish that does not exist should throw error', () => {
          // Arrange
          const wishRepository = {
            getOneById: jest.fn().mockReturnValue(null),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UpdateWishHandler(wishRepository, unitOfWork);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('update a deleted wish should throw error', () => {
          // Arrange
          const wish = { isDeleted: true } as MockedObject<Wish>;

          const wishRepository = {
            getOneById: jest.fn().mockReturnValue(wish),
          } as MockedObject<WishRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UpdateWishHandler(wishRepository, unitOfWork);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        test.each([
          new UpdateWishCommand(
            'id 0',
            'title 0',
            'description 0',
            PrivacyLevel.Public,
            [],
            [],
            [],
          ),
          new UpdateWishCommand(
            'id 1',
            'title 1',
            'description 2',
            PrivacyLevel.JustFriends,
            ['https://wwww.example.com/1'],
            [],
            ['tech'],
          ),
          new UpdateWishCommand(
            'id 2',
            'title 2',
            'description 2',
            PrivacyLevel.OnlyMe,
            ['https://wwww.example.com/2'],
            ['https://wwww.example.com/2.jpg'],
            ['tech'],
          ),
          new UpdateWishCommand(
            'id 3',
            'title 3',
            'description 3',
            PrivacyLevel.OnlyMe,
            ['https://wwww.example.com/3'],
            ['https://wwww.example.com/3.jpg'],
            ['tech'],
            '2021-11-05T16:08:46.164Z',
            '2021-11-05T16:08:46.164Z',
          ),
        ])(
          'should call the method update from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: UpdateWishCommand) => {
            // Arrange
            const wish = {
              id: { value: 'id' },
              isDeleted: false,
              update: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(wish),
              updateWish: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new UpdateWishHandler(wishRepository, unitOfWork);

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.update.mock.calls).toHaveLength(1);
            expect(wishRepository.updateWish.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.updateWish.mock.calls[0][0].id.value).toBe(
              wish.id.value,
            );
          },
        );
      });
    });
  });
});
