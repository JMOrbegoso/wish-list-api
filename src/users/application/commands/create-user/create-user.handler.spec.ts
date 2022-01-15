import { BadRequestException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { CreateUserCommand, CreateUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UserRepository } from '../../../domain/repositories';
import {
  EmailSenderService,
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('create-user', () => {
        it('should throw BadRequestException because already exist an User with that Id, Email or Username', () => {
          // Arrange
          const encryptionService = {} as MockedObject<EncryptionService>;
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {
            userExists: jest.fn().mockReturnValue(true),
          } as MockedObject<UserRepository>;

          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new CreateUserHandler(
            unitOfWork,
            userRepository,
            encryptionService,
            uniqueIdGeneratorService,
            emailSenderService,
          );

          const command = new CreateUserCommand(
            'id-1',
            'email1@email.com',
            'John_Doe_1',
            'password',
            'John',
            'Doe',
            2,
            'Nice guy.',
          );

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should call the method hashPassword from EncryptionService, the method add from the UserRepository, the method commitChanges from the UnitOfWork, the method generateId from UniqueIdGeneratorService and the method send from EmailSenderService', async () => {
          // Arrange
          const encryptionService = {
            hashPassword: jest.fn().mockReturnValue('password hashed'),
          } as MockedObject<EncryptionService>;

          const verificationCodeId = 'verification-code-id';

          const uniqueIdGeneratorService = {
            generateId: jest.fn().mockReturnValue(verificationCodeId),
          } as MockedObject<UniqueIdGeneratorService>;

          const emailSenderService = {
            send: jest.fn(),
          } as MockedObject<EmailSenderService>;

          const userRepository = {
            userExists: jest.fn().mockReturnValue(false),
            addUser: jest.fn(),
            addVerificationCode: jest.fn(),
          } as MockedObject<UserRepository>;

          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new CreateUserHandler(
            unitOfWork,
            userRepository,
            encryptionService,
            uniqueIdGeneratorService,
            emailSenderService,
          );

          const command = new CreateUserCommand(
            'id-1',
            'email1@email.com',
            'John_Doe_1',
            'password',
            'John',
            'Doe',
            2,
            'Nice guy.',
          );

          // Act
          await handler.execute(command);

          // Assert
          expect(encryptionService.hashPassword.mock.calls).toHaveLength(1);
          expect(uniqueIdGeneratorService.generateId.mock.calls).toHaveLength(
            1,
          );
          expect(userRepository.addUser.mock.calls).toHaveLength(1);
          expect(userRepository.addVerificationCode.mock.calls).toHaveLength(1);

          expect(userRepository.addUser.mock.calls[0][0].id.value).toBe(
            command.id,
          );
          expect(userRepository.addUser.mock.calls[0][0].email.getEmail).toBe(
            command.email,
          );
          expect(
            userRepository.addUser.mock.calls[0][0].username.getUsername,
          ).toBe(command.username);
          expect(
            userRepository.addUser.mock.calls[0][0].passwordHash
              .getPasswordHash,
          ).toBe('password hashed');
          expect(userRepository.addUser.mock.calls[0][0].isVerified).toBe(
            false,
          );
          expect(userRepository.addUser.mock.calls[0][0].isBlocked).toBe(false);
          expect(
            userRepository.addUser.mock.calls[0][0].firstName.getFirstName,
          ).toBe(command.firstName);
          expect(
            userRepository.addUser.mock.calls[0][0].lastName.getLastName,
          ).toBe(command.lastName);
          expect(
            userRepository.addUser.mock.calls[0][0].birthday.getMilliseconds,
          ).toBe(command.birthday);
          expect(
            userRepository.addUser.mock.calls[0][0].createdAt.getMilliseconds,
          ).not.toBeNull();
          expect(
            userRepository.addUser.mock.calls[0][0].updatedAt.getMilliseconds,
          ).not.toBeNull();
          expect(
            userRepository.addUser.mock.calls[0][0].biography.getBiography,
          ).toBe(command.biography);
          expect(userRepository.addUser.mock.calls[0][0].roles.length).toBe(1);
          expect(userRepository.addUser.mock.calls[0][0].roles[0]).toBe(
            'Basic',
          );
          expect(userRepository.addUser.mock.calls[0][0].deletedAt).toBeNull();
          expect(
            userRepository.addVerificationCode.mock.calls[0][0].id.value,
          ).toBe(verificationCodeId);
          expect(
            userRepository.addVerificationCode.mock.calls[0][1].value,
          ).toBe(command.id);

          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);

          expect(emailSenderService.send.mock.calls).toHaveLength(1);
        });
      });
    });
  });
});
