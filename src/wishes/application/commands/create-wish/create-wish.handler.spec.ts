import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { CreateWishCommand, CreateWishHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UserRepository } from '../../../../users/domain/repositories';
import { WishRepository } from '../../../domain/repositories';
import { PrivacyLevel } from '../../../domain/value-objects';

const commands = [
  new CreateWishCommand(
    'id 0',
    'title 0',
    'description 0',
    PrivacyLevel.Public,
    'wisherId 0',
    [],
    [],
    [],
    new Date().getTime(),
    new Date().getTime(),
  ),
  new CreateWishCommand(
    'id 1',
    'title 1',
    'description 1',
    PrivacyLevel.Public,
    'wisherId 1',
    ['https://www.example.com', 'https://www.example.net'],
    ['https://www.example.com/1.jpg', 'https://www.example.net/1.jpg'],
    [],
  ),
  new CreateWishCommand(
    'id 2',
    'title 2',
    'description 2',
    PrivacyLevel.Public,
    'wisherId 2',
    [],
    ['https://www.example.com/2.jpg', 'https://www.example.net/2.jpg'],
    ['tech', 'tech 2'],
    1000000000,
  ),
];

describe('wishes', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('create-wish', () => {
        test.each(commands)(
          'creating a wish with a user that does not exist should throw error',
          (command: CreateWishCommand) => {
            // Arrange
            const wishRepository = {} as MockedObject<WishRepository>;
            const userRepository = {
              getOneById: jest.fn().mockReturnValue(false),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishHandler(
              wishRepository,
              userRepository,
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
          'creating a wish with an id that already exist should throw error',
          (command: CreateWishCommand) => {
            // Arrange
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(true),
            } as MockedObject<WishRepository>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(true),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishHandler(
              wishRepository,
              userRepository,
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
          'creating a wish with an id that already exist should throw error',
          (command: CreateWishCommand) => {
            // Arrange
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(true),
            } as MockedObject<WishRepository>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(true),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new CreateWishHandler(
              wishRepository,
              userRepository,
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
          'wisher do not exist, should call the method addWisher and addWish from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: CreateWishCommand) => {
            // Arrange
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(null),
              getWisherById: jest.fn().mockReturnValue(null),
              addWisher: jest.fn(),
              addWish: jest.fn(),
            } as MockedObject<WishRepository>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(true),
            } as MockedObject<UserRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new CreateWishHandler(
              wishRepository,
              userRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wishRepository.addWish.mock.calls).toHaveLength(1);
            expect(wishRepository.addWisher.mock.calls).toHaveLength(1);
            expect(wishRepository.getWisherById.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.addWisher.mock.calls[0][0].id.getId).toBe(
              command.wisherId,
            );
            expect(wishRepository.addWish.mock.calls[0][0].id.getId).toBe(
              command.id,
            );
          },
        );

        test.each(commands)(
          'wisher already exist, should call the method addWish from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: CreateWishCommand) => {
            // Arrange
            const wishRepository = {
              getOneById: jest.fn().mockReturnValue(null),
              getWisherById: jest.fn().mockReturnValue(true),
              addWish: jest.fn(),
            } as MockedObject<WishRepository>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(true),
            } as MockedObject<UserRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new CreateWishHandler(
              wishRepository,
              userRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wishRepository.addWish.mock.calls).toHaveLength(1);
            expect(wishRepository.getWisherById.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.addWish.mock.calls[0][0].id.getId).toBe(
              command.id,
            );
          },
        );
      });
    });
  });
});
