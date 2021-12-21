import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import {
  ChangeWishPrivacyLevelCommand,
  ChangeWishPrivacyLevelHandler,
} from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { Wish } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

const commands = [
  new ChangeWishPrivacyLevelCommand('id 0', PrivacyLevel.JustFriends),
  new ChangeWishPrivacyLevelCommand('id 1', PrivacyLevel.OnlyMe),
  new ChangeWishPrivacyLevelCommand('id 2', PrivacyLevel.Public),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('change-wish-privacy-level', () => {
        test.each(commands)(
          'change wish privacy level of a wish that does not exist should throw error',
          (command: ChangeWishPrivacyLevelCommand) => {
            // Arrange
            const wishRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new ChangeWishPrivacyLevelHandler(
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
          'change wish privacy level of a deleted wish should throw error',
          (command: ChangeWishPrivacyLevelCommand) => {
            // Arrange
            const wish = { isDeleted: true } as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
            } as MockedObject<WishRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new ChangeWishPrivacyLevelHandler(
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
          async (command: ChangeWishPrivacyLevelCommand) => {
            // Arrange
            const wish = {
              id: { getId: 'id' },
              isDeleted: false,
              changePrivacyLevel: jest.fn(),
            } as MockedObject<Wish>;

            const wishRepository = {
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as MockedObject<WishRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new ChangeWishPrivacyLevelHandler(
              wishRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wish.changePrivacyLevel.mock.calls).toHaveLength(1);
            expect(
              wish.changePrivacyLevel.mock.calls[0][0].getPrivacyLevel,
            ).toBe(command.privacyLevel);
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
