import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { UnblockUserCommand, UnblockUserHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const commands = [
  new UnblockUserCommand('id 0'),
  new UnblockUserCommand('id 1'),
  new UnblockUserCommand('id 2'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('unblock-user', () => {
        test.each(commands)(
          'should throw NotFoundException',
          (command: UnblockUserCommand) => {
            // Arrange
            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({
              userRepository: userRepository,
            } as unknown as UnitOfWork);

            const handler = new UnblockUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException',
          (command: UnblockUserCommand) => {
            // Arrange
            const user = mocked<User>({
              id: {
                getId: 'id-0',
              },
              email: {
                getEmail: 'email0@email.com',
              },
              username: {
                getUsername: 'John_Doe_0',
              },
              passwordHash: {
                getPasswordHash: 'hash0',
              },
              isVerified: true,
              isBlocked: false,
              firstName: {
                getFirstName: 'FirstName0',
              },
              lastName: {
                getLastName: 'LastName0',
              },
              birthday: {
                getMilliseconds: 1,
              },
              createdAt: {
                getMilliseconds: 2,
              },
              updatedAt: {
                getMilliseconds: 3,
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getMilliseconds: 4,
              },
            } as unknown as User);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({
              userRepository: userRepository,
            } as unknown as UnitOfWork);

            const handler = new UnblockUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method block of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork',
          async (command: UnblockUserCommand) => {
            // Arrange
            const user = mocked<User>({
              id: {
                getId: 'id-0',
              },
              email: {
                getEmail: 'email0@email.com',
              },
              username: {
                getUsername: 'John_Doe_0',
              },
              passwordHash: {
                getPasswordHash: 'hash0',
              },
              isVerified: true,
              isBlocked: true,
              firstName: {
                getFirstName: 'FirstName0',
              },
              lastName: {
                getLastName: 'LastName0',
              },
              birthday: {
                getMilliseconds: 1,
              },
              createdAt: {
                getMilliseconds: 2,
              },
              updatedAt: {
                getMilliseconds: 3,
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getMilliseconds: 4,
              },
              unblock: jest.fn(),
            } as unknown as User);

            const userRepository = mocked<UserRepository>({
              getOne: jest.fn().mockReturnValue(user),
              update: jest.fn(),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({
              userRepository: userRepository,
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

            const handler = new UnblockUserHandler(unitOfWork, userRepository);

            // Act
            await handler.execute(command);

            // Assert
            expect(user.unblock.mock.calls).toHaveLength(1);
            expect(userRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
