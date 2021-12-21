import { BadRequestException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { CreateUserCommand, CreateUserHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { UserRepository } from '../../../domain/repositories';
import {
  EmailSenderService,
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../services';

const commands = [
  new CreateUserCommand(
    'id-0',
    'email0@email.com',
    'John_Doe_0',
    'password',
    'John',
    'Doe',
    1,
    'Nice guy.',
  ),
  new CreateUserCommand(
    'id-1',
    'email1@email.com',
    'John_Doe_1',
    'password',
    'John',
    'Doe',
    2,
    'Nice guy.',
  ),
];

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('create-user', () => {
        test.each(commands)(
          'should throw BadRequestException because already exist an User with that Id, Email or Username',
          (command: CreateUserCommand) => {
            // Arrange
            const encryptionService =
              {} as unknown as MockedObject<EncryptionService>;
            const uniqueIdGeneratorService =
              {} as unknown as MockedObject<UniqueIdGeneratorService>;
            const emailSenderService =
              {} as unknown as MockedObject<EmailSenderService>;
            const userRepository = {
              userExists: jest.fn().mockReturnValue(true),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {
              userRepository: userRepository,
            } as unknown as MockedObject<UnitOfWork>;

            const handler = new CreateUserHandler(
              unitOfWork,
              userRepository,
              encryptionService,
              uniqueIdGeneratorService,
              emailSenderService,
            );

            // Act

            // Assert
            return expect(handler.execute(command)).rejects.toThrowError(
              BadRequestException,
            );
          },
        );

        test.each(commands)(
          'should call the method hashPassword from EncryptionService, the method add from the UserRepository, the method commitChanges from the UnitOfWork, the method generateId from UniqueIdGeneratorService and the method send from EmailSenderService',
          async (command: CreateUserCommand) => {
            // Arrange
            const encryptionService = {
              hashPassword: jest.fn().mockReturnValue('password hashed'),
            } as unknown as MockedObject<EncryptionService>;

            const uniqueId = {
              getId: 'verification-code-id',
            } as unknown as MockedObject<UniqueId>;

            const uniqueIdGeneratorService = {
              generateId: jest.fn().mockReturnValue(uniqueId),
            } as unknown as MockedObject<UniqueIdGeneratorService>;

            const emailSenderService = {
              send: jest.fn(),
            } as unknown as MockedObject<EmailSenderService>;

            const userRepository = {
              userExists: jest.fn().mockReturnValue(false),
              add: jest.fn(),
            } as unknown as MockedObject<UserRepository>;

            const unitOfWork = {
              userRepository: userRepository,
              commitChanges: jest.fn(),
            } as unknown as MockedObject<UnitOfWork>;

            const handler = new CreateUserHandler(
              unitOfWork,
              userRepository,
              encryptionService,
              uniqueIdGeneratorService,
              emailSenderService,
            );

            // Act
            await handler.execute(command);

            // Assert
            expect(encryptionService.hashPassword.mock.calls).toHaveLength(1);
            expect(userRepository.add.mock.calls).toHaveLength(1);
            expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
            expect(uniqueIdGeneratorService.generateId.mock.calls).toHaveLength(
              1,
            );
            expect(emailSenderService.send.mock.calls).toHaveLength(1);

            expect(userRepository.add.mock.calls[0][0].id.getId).toBe(
              command.id,
            );
            expect(userRepository.add.mock.calls[0][0].email.getEmail).toBe(
              command.email,
            );
            expect(
              userRepository.add.mock.calls[0][0].username.getUsername,
            ).toBe(command.username);
            expect(
              userRepository.add.mock.calls[0][0].passwordHash.getPasswordHash,
            ).toBe('password hashed');
            expect(userRepository.add.mock.calls[0][0].isVerified).toBe(false);
            expect(userRepository.add.mock.calls[0][0].verificationCode).toBe(
              'verification-code-id',
            );
            expect(userRepository.add.mock.calls[0][0].isBlocked).toBe(false);
            expect(
              userRepository.add.mock.calls[0][0].firstName.getFirstName,
            ).toBe(command.firstName);
            expect(
              userRepository.add.mock.calls[0][0].lastName.getLastName,
            ).toBe(command.lastName);
            expect(
              userRepository.add.mock.calls[0][0].birthday.getMilliseconds,
            ).toBe(command.birthday);
            expect(
              userRepository.add.mock.calls[0][0].createdAt.getMilliseconds,
            ).not.toBeNull();
            expect(
              userRepository.add.mock.calls[0][0].updatedAt.getMilliseconds,
            ).not.toBeNull();
            expect(
              userRepository.add.mock.calls[0][0].biography.getBiography,
            ).toBe(command.biography);
            expect(userRepository.add.mock.calls[0][0].roles.length).toBe(1);
            expect(userRepository.add.mock.calls[0][0].roles[0]).toBe('Basic');
            expect(userRepository.add.mock.calls[0][0].deletedAt).toBeNull();
          },
        );
      });
    });
  });
});
