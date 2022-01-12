import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { VerifyUserCommand, VerifyUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const commands = [
  new VerifyUserCommand('code-0'),
  new VerifyUserCommand('code-1'),
  new VerifyUserCommand('code-2'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('verify-user', () => {
        test.each(commands)(
          'should throw NotFoundException',
          (command: VerifyUserCommand) => {
            // Arrange
            const userRepository = {
              getOneByVerificationCode: jest.fn().mockReturnValue(null),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new VerifyUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException because the user is deleted',
          (command: VerifyUserCommand) => {
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
              isVerified: false,
              isBlocked: false,
              isDeleted: true,
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
            } as MockedObject<User>;

            const userRepository = {
              getOneByVerificationCode: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new VerifyUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException because the user is blocked',
          (command: VerifyUserCommand) => {
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
              isVerified: false,
              isBlocked: true,
              isDeleted: false,
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
            } as MockedObject<User>;

            const userRepository = {
              getOneByVerificationCode: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new VerifyUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException because the user is already verified',
          (command: VerifyUserCommand) => {
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
            } as MockedObject<User>;

            const userRepository = {
              getOneByVerificationCode: jest.fn().mockReturnValue(user),
            } as MockedObject<UserRepository>;

            const unitOfWork = {} as MockedObject<UnitOfWork>;

            const handler = new VerifyUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method verify of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork',
          async (command: VerifyUserCommand) => {
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
              deletedAt: {
                getMilliseconds: 4,
              },
              verify: jest.fn(),
            } as MockedObject<User>;

            const userRepository = {
              getOneByVerificationCode: jest.fn().mockReturnValue(user),
              updateUser: jest.fn(),
            } as MockedObject<UserRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as MockedObject<UnitOfWork>;

            const handler = new VerifyUserHandler(unitOfWork, userRepository);

            // Act
            await handler.execute(command);

            // Assert
            expect(user.verify.mock.calls).toHaveLength(1);
            expect(userRepository.updateUser.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
