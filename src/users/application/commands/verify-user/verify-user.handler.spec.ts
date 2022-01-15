import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { VerifyUserCommand, VerifyUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import {
  User,
  VerificationCode,
  VerificationCodeId,
} from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('verify-user', () => {
        it('command is null, so handler should throw BadRequestException', () => {
          // Arrange
          const userRepository = {} as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          // Act

          // Assert
          return expect(handler.execute(null)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('verification code in command is null, so handler should throw BadRequestException', () => {
          // Arrange
          const userRepository = {} as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand(null);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('user does not exist, so should throw NotFoundException', () => {
          // Arrange
          const userRepository = {
            getOneByVerificationCodeId: jest.fn().mockReturnValue(null),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand('id-0');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('user is deleted, so should throw BadRequestException', () => {
          // Arrange
          const user = { isDeleted: true } as MockedObject<User>;

          const userRepository = {
            getOneByVerificationCodeId: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand('id-0');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('user is blocked, so should throw BadRequestException', () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: true,
          } as MockedObject<User>;

          const userRepository = {
            getOneByVerificationCodeId: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand('id-0');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('user is already verified, so should throw BadRequestException', () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: true,
          } as MockedObject<User>;

          const userRepository = {
            getOneByVerificationCodeId: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand('id-0');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('verification code is expired, so should throw BadRequestException', () => {
          // Arrange
          const verificationCode = {
            id: {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<VerificationCodeId> as VerificationCodeId,
            isExpired: true,
          } as MockedObject<VerificationCode>;
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: false,
            verify: jest.fn(),
            verificationCodes: [verificationCode] as VerificationCode[],
          } as MockedObject<User>;

          const userRepository = {
            getOneByVerificationCodeId: jest.fn().mockReturnValue(user),
            updateUser: jest.fn(),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand('id-0');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should call the method verify of the User, call the updateUser method of the UserRepository and the commitChanges method of the UnitOfWork', async () => {
          // Arrange
          const verificationCode = {
            id: {
              equals: jest.fn().mockReturnValue(true),
            } as MockedObject<VerificationCodeId> as VerificationCodeId,
            isExpired: false,
          } as MockedObject<VerificationCode>;
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: false,
            verify: jest.fn(),
            verificationCodes: [verificationCode] as VerificationCode[],
          } as MockedObject<User>;

          const userRepository = {
            getOneByVerificationCodeId: jest.fn().mockReturnValue(user),
            updateUser: jest.fn(),
          } as MockedObject<UserRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new VerifyUserHandler(unitOfWork, userRepository);

          const command = new VerifyUserCommand('id-0');

          // Act
          await handler.execute(command);

          // Assert
          expect(user.verify.mock.calls).toHaveLength(1);
          expect(userRepository.updateUser.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
