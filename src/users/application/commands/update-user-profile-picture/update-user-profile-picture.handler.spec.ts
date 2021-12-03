import { BadRequestException, NotFoundException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import {
  UpdateUserProfilePictureCommand,
  UpdateUserProfilePictureHandler,
} from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-user-profile-picture', () => {
        test('should throw NotFoundException', () => {
          // Arrange
          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(null),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const command = mocked<UpdateUserProfilePictureCommand>({
            id: 'id-0',
          } as unknown as UpdateUserProfilePictureCommand);

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

        test('should throw BadRequestException because the user is deleted', () => {
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
            isDeleted: true,
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const command = mocked<UpdateUserProfilePictureCommand>({
            id: 'id-0',
          } as unknown as UpdateUserProfilePictureCommand);

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

        test('should throw BadRequestException because the user is blocked', () => {
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
            deletedAt: null,
            isDeleted: false,
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const command = mocked<UpdateUserProfilePictureCommand>({
            id: 'id-0',
          } as unknown as UpdateUserProfilePictureCommand);

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

        test('should throw BadRequestException because the user is not verified', () => {
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
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
          } as unknown as UnitOfWork);

          const command = mocked<UpdateUserProfilePictureCommand>({
            id: 'id-0',
          } as unknown as UpdateUserProfilePictureCommand);

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

        test('Update user profile picture with an image url should call the method updateProfilePicture of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
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
            updateProfilePicture: jest.fn(),
          } as unknown as User);

          const userRepository = mocked<UserRepository>({
            getOne: jest.fn().mockReturnValue(user),
            update: jest.fn(),
          } as unknown as UserRepository);

          const unitOfWork = mocked<UnitOfWork>({
            userRepository: userRepository,
            commitChanges: jest.fn(),
          } as unknown as UnitOfWork);

          const command = mocked<UpdateUserProfilePictureCommand>({
            id: 'id-0',
            profilePicture: 'https://www.example.com/new_image.jpg',
          } as unknown as UpdateUserProfilePictureCommand);

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
        });
      });

      test('Update user profile picture with null should call the method updateProfilePicture of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
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
          updateProfilePicture: jest.fn(),
        } as unknown as User);

        const userRepository = mocked<UserRepository>({
          getOne: jest.fn().mockReturnValue(user),
          update: jest.fn(),
        } as unknown as UserRepository);

        const unitOfWork = mocked<UnitOfWork>({
          userRepository: userRepository,
          commitChanges: jest.fn(),
        } as unknown as UnitOfWork);

        const command = mocked<UpdateUserProfilePictureCommand>({
          id: 'id-0',
          profilePicture: null,
        } as unknown as UpdateUserProfilePictureCommand);

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
      });
    });
  });
});
