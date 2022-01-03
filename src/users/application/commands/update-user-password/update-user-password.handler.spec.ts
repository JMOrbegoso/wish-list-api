import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UpdateUserPasswordCommand, UpdateUserPasswordHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { EncryptionService } from '../../services';

const commands = [
  new UpdateUserPasswordCommand('id-0', 'password'),
  new UpdateUserPasswordCommand('id-1', 'password-1'),
  new UpdateUserPasswordCommand('id-2', 'password-2'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-user-password', () => {
        test.each(commands)(
          'should throw NotFoundException',
          (command: UpdateUserPasswordCommand) => {
            // Arrange
            const userRepository = {
              getOneById: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {} as MockedObject<EncryptionService>;
            const handler = new UpdateUserPasswordHandler(
              unitOfWork,
              userRepository,
              encryptionService,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException because the user is deleted',
          (command: UpdateUserPasswordCommand) => {
            // Arrange
            const user = {
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
              isDeleted: true,
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {} as MockedObject<EncryptionService>;
            const handler = new UpdateUserPasswordHandler(
              unitOfWork,
              userRepository,
              encryptionService,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException because the user is blocked',
          (command: UpdateUserPasswordCommand) => {
            // Arrange
            const user = {
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
              deletedAt: null,
              isDeleted: false,
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {} as MockedObject<EncryptionService>;
            const handler = new UpdateUserPasswordHandler(
              unitOfWork,
              userRepository,
              encryptionService,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException because the user is not verified',
          (command: UpdateUserPasswordCommand) => {
            // Arrange
            const user = {
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
              isVerified: false,
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
              deletedAt: null,
              isDeleted: false,
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const encryptionService = {} as MockedObject<EncryptionService>;
            const handler = new UpdateUserPasswordHandler(
              unitOfWork,
              userRepository,
              encryptionService,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method updatePasswordHash of the User, call the method hashPassword of the EncryptionService, call the update method of the UserRepository and the commitChanges method of the UnitOfWork',
          async (command: UpdateUserPasswordCommand) => {
            // Arrange
            const user = {
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
              updatePasswordHash: jest.fn(),
            } as MockedObject<User>;

            const userRepository = {
              getOneById: jest.fn().mockReturnValue(user),
              update: jest.fn(),
            } as MockedObject<UserRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const encryptionService = {
              hashPassword: jest.fn().mockReturnValue('password hashed'),
            } as MockedObject<EncryptionService>;

            const handler = new UpdateUserPasswordHandler(
              unitOfWork,
              userRepository,
              encryptionService,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(user.updatePasswordHash.mock.calls).toHaveLength(1);
            expect(encryptionService.hashPassword.mock.calls).toHaveLength(1);
            expect(userRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
