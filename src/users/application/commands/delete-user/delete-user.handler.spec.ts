import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { DeleteUserCommand, DeleteUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

const commands = [
  new DeleteUserCommand('id 0'),
  new DeleteUserCommand('id 1'),
  new DeleteUserCommand('id 2'),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('delete-user', () => {
        test.each(commands)(
          'should throw NotFoundException',
          (command: DeleteUserCommand) => {
            // Arrange
            const userRepository = {
              getOne: jest.fn().mockReturnValue(null),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {
              userRepository: userRepository,
            } as unknown as MockedObject<UnitOfWork>;

            const handler = new DeleteUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              NotFoundException,
            );
          },
        );

        test.each(commands)(
          'should throw BadRequestException',
          (command: DeleteUserCommand) => {
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
              deletedAt: {
                getMilliseconds: 4,
              },
              isDeleted: true,
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {
              userRepository: userRepository,
            } as unknown as MockedObject<UnitOfWork>;

            const handler = new DeleteUserHandler(unitOfWork, userRepository);

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method delete of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork',
          async (command: DeleteUserCommand) => {
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
              deletedAt: null,
              isDeleted: false,
              delete: jest.fn(),
            } as unknown as MockedObject<User>;

            const userRepository = {
              getOne: jest.fn().mockReturnValue(user),
              update: jest.fn(),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {
              userRepository: userRepository,
              commitChanges: jest.fn(),
            } as unknown as MockedObject<UnitOfWork>;

            const handler = new DeleteUserHandler(unitOfWork, userRepository);

            // Act
            await handler.execute(command);

            // Assert
            expect(user.delete.mock.calls).toHaveLength(1);
            expect(userRepository.update.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          },
        );
      });
    });
  });
});
