import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import {
  UpdateUserProfilePictureCommand,
  UpdateUserProfilePictureHandler,
} from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const commands = [
  new UpdateUserProfilePictureCommand('id 0', 'https://www.example.com/1.jpg'),
  new UpdateUserProfilePictureCommand('id 1', 'https://www.example.com/2.jpg'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-user-profile-picture', () => {
        test.each(commands)(
          'should throw NotFoundException',
          (command: UpdateUserProfilePictureCommand) => {
            // Arrange
            const userRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

            const handler = new UpdateUserProfilePictureHandler(
              unitOfWork,
              userRepository,
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
          (command: UpdateUserProfilePictureCommand) => {
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
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

            const handler = new UpdateUserProfilePictureHandler(
              unitOfWork,
              userRepository,
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
          (command: UpdateUserProfilePictureCommand) => {
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
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

            const handler = new UpdateUserProfilePictureHandler(
              unitOfWork,
              userRepository,
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
          (command: UpdateUserProfilePictureCommand) => {
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
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {} as unknown as MockedObject<UnitOfWork>;

            const handler = new UpdateUserProfilePictureHandler(
              unitOfWork,
              userRepository,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'Update user profile picture with an image url should call the method updateProfilePicture of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork',
          async (command: UpdateUserProfilePictureCommand) => {
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
              updateProfilePicture: jest.fn(),
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
              update: jest.fn(),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {
              commitChanges: jest.fn(),
            } as unknown as MockedObject<UnitOfWork>;

            const handler = new UpdateUserProfilePictureHandler(
              unitOfWork,
              userRepository,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(user.updateProfilePicture.mock.calls).toHaveLength(1);
            expect(userRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });

      test.each(commands)(
        'Update user profile picture with null should call the method updateProfilePicture of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork',
        async (command: UpdateUserProfilePictureCommand) => {
          // Arrange
          command = new UpdateUserProfilePictureCommand('id 0', null);

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
            updateProfilePicture: jest.fn(),
          } as unknown as MockedObject<User>;

          const userRepository = {
            getOne: jest.fn().mockReturnValue(user),
            update: jest.fn(),
          } as unknown as MockedObject<UserRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as unknown as MockedObject<UnitOfWork>;

          const handler = new UpdateUserProfilePictureHandler(
            unitOfWork,
            userRepository,
          );

          // Act
          await handler.execute(command);

          // Assert
          expect(user.updateProfilePicture.mock.calls).toHaveLength(1);
          expect(userRepository.update.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        },
      );
    });
  });
});
