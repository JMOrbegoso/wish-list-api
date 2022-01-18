import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UndeleteUserCommand, UndeleteUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('undelete-user', () => {
        const command = new UndeleteUserCommand('id 0');

        it('should throw NotFoundException', () => {
          // Arrange
          const userRepository = {
            getOneById: jest.fn().mockReturnValue(null),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UndeleteUserHandler(unitOfWork, userRepository);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('should throw BadRequestException because the user is not deleted', () => {
          // Arrange
          const user = {
            isDeleted: false,
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new UndeleteUserHandler(unitOfWork, userRepository);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should call the method delete of the User, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
          // Arrange
          const user = {
            isDeleted: true,
            undelete: jest.fn(),
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
            updateUser: jest.fn(),
          } as MockedObject<UserRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new UndeleteUserHandler(unitOfWork, userRepository);

          // Act
          await handler.execute(command);

          // Assert
          expect(user.undelete.mock.calls).toHaveLength(1);
          expect(userRepository.updateUser.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
