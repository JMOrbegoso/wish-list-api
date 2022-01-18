import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import {
  UpdateUserProfilePictureCommand,
  UpdateUserProfilePictureHandler,
} from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-user-profile-picture', () => {
        const command = new UpdateUserProfilePictureCommand(
          'id 0',
          'https://www.example.com/1.jpg',
        );

        it('should throw NotFoundException', () => {
          // Arrange
          const userRepository = {
            getOneById: jest.fn().mockReturnValue(null),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UpdateUserProfilePictureHandler(
            unitOfWork,
            userRepository,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('should throw BadRequestException because the user is deleted', () => {
          // Arrange
          const user = {
            isDeleted: true,
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UpdateUserProfilePictureHandler(
            unitOfWork,
            userRepository,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should throw BadRequestException because the user is blocked', () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: true,
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UpdateUserProfilePictureHandler(
            unitOfWork,
            userRepository,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should throw BadRequestException because the user is not verified', () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: false,
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UpdateUserProfilePictureHandler(
            unitOfWork,
            userRepository,
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('Update user profile picture with an image url should call the method updateProfilePicture of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: true,
            updateProfilePicture: jest.fn(),
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
            updateUser: jest.fn(),
          } as MockedObject<UserRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new UpdateUserProfilePictureHandler(
            unitOfWork,
            userRepository,
          );

          // Act
          await handler.execute(command);

          // Assert
          expect(user.updateProfilePicture.mock.calls).toHaveLength(1);
          expect(userRepository.updateUser.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });

      it('Update user profile picture with null should call the method updateProfilePicture of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
        // Arrange
        const command = new UpdateUserProfilePictureCommand('id 0', null);

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
          updateProfilePicture: jest.fn(),
        } as MockedObject<User>;

        const userRepository = {
          getOneById: jest.fn().mockReturnValue(user),
          updateUser: jest.fn(),
        } as MockedObject<UserRepository>;

        const unitOfWork = {
          commitChanges: jest.fn(),
        } as MockedObject<UnitOfWork>;

        const handler = new UpdateUserProfilePictureHandler(
          unitOfWork,
          userRepository,
        );

        // Act
        await handler.execute(command);

        // Assert
        expect(user.updateProfilePicture.mock.calls).toHaveLength(1);
        expect(userRepository.updateUser.mock.calls).toHaveLength(1);
        expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
      });
    });
  });
});
