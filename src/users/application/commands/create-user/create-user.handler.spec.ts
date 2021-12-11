import { BadRequestException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { CreateUserCommand, CreateUserHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UniqueId } from '../../../../core/domain/value-objects';
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
            const encryptionService = mocked<EncryptionService>(
              {} as unknown as EncryptionService,
            );

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>(
              {} as unknown as UniqueIdGeneratorService,
            );

            const emailSenderService = mocked<EmailSenderService>(
              {} as unknown as EmailSenderService,
            );

            const userRepository = mocked<UserRepository>({
              userExists: jest.fn().mockReturnValue(true),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({
              userRepository: userRepository,
            } as unknown as UnitOfWork);

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
            const encryptionService = mocked<EncryptionService>({
              hashPassword: jest.fn().mockReturnValue('password hashed'),
            } as unknown as EncryptionService);

            const uniqueId = mocked<UniqueId>({
              getId: 'verification-code-id',
            } as unknown as UniqueId);

            const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>({
              generateId: jest.fn().mockReturnValue(uniqueId),
            } as unknown as UniqueIdGeneratorService);

            const emailSenderService = mocked<EmailSenderService>({
              send: jest.fn(),
            } as unknown as EmailSenderService);

            const userRepository = mocked<UserRepository>({
              userExists: jest.fn().mockReturnValue(false),
              add: jest.fn(),
            } as unknown as UserRepository);

            const unitOfWork = mocked<UnitOfWork>({
              userRepository: userRepository,
              commitChanges: jest.fn(),
            } as unknown as UnitOfWork);

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
