import { BadRequestException } from '@nestjs/common';
import { mocked } from 'ts-jest/utils';
import { CreateUserCommand, CreateUserHandler } from '..';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { UserRepository } from '../../../../users/domain/repositories';
import {
  EmailSenderService,
  EncryptionService,
  UniqueIdGeneratorService,
} from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('create-user', () => {
        test('should throw BadRequestException because already exist an User with that Id, Email or Username', () => {
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

          const command = mocked<CreateUserCommand>({
            id: 'id-0',
            email: 'email0@email.com',
            username: 'John_Doe_0',
          } as unknown as CreateUserCommand);

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
        });

        test('should call the method hashPassword from EncryptionService, the method add from the UserRepository, the method commitChanges from the UnitOfWork, the method generateId from UniqueIdGeneratorService and the method send from EmailSenderService', async () => {
          // Arrange
          const encryptionService = mocked<EncryptionService>({
            hashPassword: jest.fn().mockReturnValue('password hashed'),
          } as unknown as EncryptionService);

          const uniqueIdGeneratorService = mocked<UniqueIdGeneratorService>({
            generateId: jest.fn().mockReturnValue('id-0'),
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

          const command = mocked<CreateUserCommand>({
            id: 'id-0',
            email: 'email0@email.com',
            username: 'John_Doe_0',
            password: 'password0',
            firstName: 'FirstName0',
            lastName: 'LastName0',
            birthday: 1,
            biography: 'A nice person 0.',
            profilePicture: 'https://www.example.com/0.jpg',
          } as unknown as CreateUserCommand);

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
        });
      });
    });
  });
});
