import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UpdateUserPasswordCommand, UpdateUserPasswordHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { EncryptionService } from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('update-user-password', () => {
        const command = new UpdateUserPasswordCommand('id-0', 'password');

        it('should throw NotFoundException', () => {
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
        });

        it('should call the method updatePasswordHash of the User, call the method hashPassword of the EncryptionService, call the update method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: true,
            updatePasswordHash: jest.fn(),
          } as MockedObject<User>;

          const userRepository = {
            getOneById: jest.fn().mockReturnValue(user),
            updateUser: jest.fn(),
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
          expect(userRepository.updateUser.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
