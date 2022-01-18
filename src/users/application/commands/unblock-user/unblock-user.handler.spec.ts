import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UnblockUserCommand, UnblockUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
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
            const userRepository = {
              getOneById: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const user = {
              id: {
                value: 'id-0',
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
                getIso8601: '1',
              },
              createdAt: {
                getIso8601: '2',
              },
              updatedAt: {
                getIso8601: '3',
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getIso8601: '4',
              },
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

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
            const user = {
              id: {
                value: 'id-0',
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
                getIso8601: '1',
              },
              createdAt: {
                getIso8601: '2',
              },
              updatedAt: {
                getIso8601: '3',
              },
              biography: {
                getBiography: 'A nice person 0.',
              },
              profilePicture: {
                getUrl: 'https://www.example.com/0.jpg',
              },
              deletedAt: {
                getIso8601: '4',
              },
              unblock: jest.fn(),
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
              updateUser: jest.fn(),
            } as MockedObject<UserRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new UnblockUserHandler(unitOfWork, userRepository);

            // Act
            await handler.execute(command);

            // Assert
            expect(user.unblock.mock.calls).toHaveLength(1);
            expect(userRepository.updateUser.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
