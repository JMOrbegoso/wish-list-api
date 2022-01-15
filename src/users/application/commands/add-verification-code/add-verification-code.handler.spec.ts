import { BadRequestException, NotFoundException } from '@nestjs/common';
import { MockedObject } from 'ts-jest/dist/utils/testing';
import { AddVerificationCodeCommand, AddVerificationCodeHandler } from '..';
import { UnitOfWork } from '../../../../shared/domain/repositories';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { EmailSenderService, UniqueIdGeneratorService } from '../../services';

describe('users', () => {
  describe('application', () => {
    describe('commands', () => {
      describe('add-verification-code', () => {
        it('command is null, so handler should throw BadRequestException', () => {
          // Arrange
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {} as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          // Act

          // Assert
          return expect(handler.execute(null)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('email in command is null, so handler should throw BadRequestException', () => {
          // Arrange
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {} as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          const command = new AddVerificationCodeCommand(null);

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('user does not exist, so should throw NotFoundException', () => {
          // Arrange
          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {
            getOneByEmail: jest.fn().mockReturnValue(null),
          } as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          const command = new AddVerificationCodeCommand('jhon@doe.com');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            NotFoundException,
          );
        });

        it('user is deleted, so should throw BadRequestException', () => {
          // Arrange
          const user = { isDeleted: true } as MockedObject<User>;

          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {
            getOneByEmail: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          const command = new AddVerificationCodeCommand('jhon@doe.com');

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

          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {
            getOneByEmail: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          const command = new AddVerificationCodeCommand('jhon@doe.com');

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

          const uniqueIdGeneratorService =
            {} as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {} as MockedObject<EmailSenderService>;
          const userRepository = {
            getOneByEmail: jest.fn().mockReturnValue(user),
          } as MockedObject<UserRepository>;
          const unitOfWork = {} as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          const command = new AddVerificationCodeCommand('jhon@doe.com');

          // Act

          // Assert
          return expect(handler.execute(command)).rejects.toThrowError(
            BadRequestException,
          );
        });

        it('should call the method send from EmailSenderService ', async () => {
          // Arrange
          const user = {
            isDeleted: false,
            isBlocked: false,
            isVerified: false,
            addVerificationCode: jest.fn(),
            username: { getUsername: 'username' },
            email: { getEmail: 'email' },
            firstName: { getFirstName: 'firstname' },
            lastName: { getLastName: 'lastname' },
          } as MockedObject<User>;

          const uniqueIdGeneratorService = {
            generateId: jest.fn().mockReturnValue('new-id'),
          } as MockedObject<UniqueIdGeneratorService>;
          const emailSenderService = {
            send: jest.fn(),
          } as MockedObject<EmailSenderService>;
          const userRepository = {
            getOneByEmail: jest.fn().mockReturnValue(user),
            updateUser: jest.fn(),
            addVerificationCode: jest.fn(),
          } as MockedObject<UserRepository>;
          const unitOfWork = {
            commitChanges: jest.fn(),
          } as MockedObject<UnitOfWork>;

          const handler = new AddVerificationCodeHandler(
            uniqueIdGeneratorService,
            emailSenderService,
            userRepository,
            unitOfWork,
          );

          const command = new AddVerificationCodeCommand('jhon@doe.com');

          // Act
          await handler.execute(command);

          // Assert

          expect(uniqueIdGeneratorService.generateId.mock.calls).toHaveLength(
            1,
          );
          expect(user.addVerificationCode.mock.calls).toHaveLength(1);
          expect(userRepository.updateUser.mock.calls).toHaveLength(1);
          expect(userRepository.addVerificationCode.mock.calls).toHaveLength(1);
          expect(unitOfWork.commitChanges.mock.calls).toHaveLength(1);
          expect(emailSenderService.send.mock.calls).toHaveLength(1);
          expect(emailSenderService.send.mock.calls[0][0]).toBe(command.email);
        });
      });
    });
  });
});
