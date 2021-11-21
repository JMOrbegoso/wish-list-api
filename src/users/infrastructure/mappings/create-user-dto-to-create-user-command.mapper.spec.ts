import { mocked } from 'ts-jest/utils';
import { createUserDtoToCreateUserCommand } from '.';
import { CreateUserDto } from '../dtos';

const validValues = [
  [
    mocked<CreateUserDto>({
      id: 'id-0',
      email: 'email0@email.com',
      username: 'John_Doe_0',
      password: 'password0',
      firstName: 'FirstName0',
      lastName: 'LastName0',
      birthday: 1,
      biography: 'A nice person 0.',
      profilePicture: 'https://www.example.com/0.jpg',
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-1',
      email: 'email1@email.com',
      username: 'John_Doe_1',
      password: 'hash1',
      firstName: 'FirstName1',
      lastName: 'LastName1',
      birthday: 1,
      biography: 'A nice person 1.',
      profilePicture: 'https://www.example.com/1.jpg',
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-2',
      email: 'email2@email.com',
      username: 'John_Doe_2',
      password: 'hash2',
      firstName: 'FirstName2',
      lastName: 'LastName2',
      birthday: 1,
      biography: 'A nice person 2.',
      profilePicture: null,
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-3',
      email: 'email3@email.com',
      username: 'John_Doe_3',
      password: 'hash3',
      firstName: 'FirstName3',
      lastName: 'LastName3',
      birthday: 1,
      biography: 'A nice person 3.',
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-4',
      email: 'email4@email.com',
      username: 'John_Doe_4',
      password: 'hash4',
      firstName: 'FirstName4',
      lastName: 'LastName4',
      birthday: 1,
      biography: 'A nice person 4.',
      profilePicture: null,
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-5',
      email: 'email5@email.com',
      username: 'John_Doe_5',
      password: 'hash5',
      firstName: 'FirstName5',
      lastName: 'LastName5',
      birthday: 1,
      biography: 'A nice person 5.',
      profilePicture: 'https://www.example.com/5.jpg',
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-6',
      email: 'email6@email.com',
      username: 'John_Doe_6',
      password: 'hash6',
      firstName: 'FirstName6',
      lastName: 'LastName6',
      birthday: 1,
      biography: 'A nice person 6.',
      profilePicture: null,
    } as unknown as CreateUserDto),
  ],
  [
    mocked<CreateUserDto>({
      id: 'id-7',
      email: 'email7@email.com',
      username: 'John_Doe_7',
      password: 'hash7',
      firstName: 'FirstName7',
      lastName: 'LastName7',
      birthday: 1,
    } as unknown as CreateUserDto),
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('CreateUserDto to CreateUserCommand', () => {
        test.each(validValues)(
          'should map CreateUserDto to CreateUserCommand keeping all the property values',
          (dto: CreateUserDto) => {
            // Arrange

            // Act
            const command = createUserDtoToCreateUserCommand(dto);

            // Assert
            expect(command.id).toBe(dto.id);
            expect(command.email).toBe(dto.email);
            expect(command.username).toBe(dto.username);
            expect(command.password).toBe(dto.password);
            expect(command.firstName).toBe(dto.firstName);
            expect(command.lastName).toBe(dto.lastName);
            expect(command.birthday).toBe(dto.birthday);
            expect(command.biography).toBe(dto.biography);
            expect(command.profilePicture).toBe(dto.profilePicture);
          },
        );
      });
    });
  });
});
