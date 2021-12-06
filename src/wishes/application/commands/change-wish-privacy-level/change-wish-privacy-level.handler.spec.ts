import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import {
  ChangeWishPrivacyLevelCommand,
  ChangeWishPrivacyLevelHandler,
} from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
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
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
            const wish = mocked<Wish>({ isDeleted: true } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
            const wish = mocked<Wish>({
              id: { getId: 'id' },
              isDeleted: false,
              changePrivacyLevel: jest.fn(),
            } as unknown as Wish);

            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(wish),
              update: jest.fn(),
            } as unknown as WishRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

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
