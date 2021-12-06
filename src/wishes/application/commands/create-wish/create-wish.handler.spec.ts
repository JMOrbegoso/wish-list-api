import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { CreateWishCommand, CreateWishHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
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
            const wishRepository = mocked<WishRepository>(
              {} as unknown as WishRepository,
            );

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(false),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(true),
            } as unknown as WishRepository);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(true),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(true),
            } as unknown as WishRepository);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(true),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({} as unknown as UnitOfWork);

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
          'should call the method add from the WishRepository, the method commitChanges from the UnitOfWork',
          async (command: CreateWishCommand) => {
            // Arrange
            const wishRepository = mocked<WishRepository>({
              getOne: jest.fn().mockReturnValue(null),
              add: jest.fn(),
            } as unknown as WishRepository);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(true),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new CreateWishHandler(
              wishRepository,
              userRepository,
              unitOfWork,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(wishRepository.add.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(wishRepository.add.mock.calls[0][0].id.getId).toBe(
              command.id,
            );
          },
        );
      });
    });
  });
});
