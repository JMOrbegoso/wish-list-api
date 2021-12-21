import { MockedObject } from 'ts-jest/dist/utils/testing';
import { User } from '../../domain/entities';
import { userToOutputUserDto } from '.';

const validValues = [
  [
    {
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
      roles: ['Admin', 'Moderator'],
      profilePicture: {
        getUrl: 'https://www.example.com/0.jpg',
      },
      deletedAt: {
        getMilliseconds: 4,
      },
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-1',
      },
      email: {
        getEmail: 'email1@email.com',
      },
      username: {
        getUsername: 'John_Doe_1',
      },
      passwordHash: {
        getPasswordHash: 'hash1',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName1',
      },
      lastName: {
        getLastName: 'LastName1',
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
        getBiography: 'A nice person 1.',
      },
      roles: ['Admin', 'Basic'],
      profilePicture: {
        getUrl: 'https://www.example.com/1.jpg',
      },
      deletedAt: {
        getMilliseconds: 4,
      },
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-2',
      },
      email: {
        getEmail: 'email2@email.com',
      },
      username: {
        getUsername: 'John_Doe_2',
      },
      passwordHash: {
        getPasswordHash: 'hash2',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName2',
      },
      lastName: {
        getLastName: 'LastName2',
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
        getBiography: 'A nice person 2.',
      },
      roles: ['Admin'],
      profilePicture: null,
      deletedAt: {
        getMilliseconds: 4,
      },
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-3',
      },
      email: {
        getEmail: 'email3@email.com',
      },
      username: {
        getUsername: 'John_Doe_3',
      },
      passwordHash: {
        getPasswordHash: 'hash3',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName3',
      },
      lastName: {
        getLastName: 'LastName3',
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
        getBiography: 'A nice person 3.',
      },
      roles: ['Admin'],
      profilePicture: {
        getUrl: 'https://www.example.com/3.jpg',
      },
      deletedAt: null,
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-4',
      },
      email: {
        getEmail: 'email4@email.com',
      },
      username: {
        getUsername: 'John_Doe_4',
      },
      passwordHash: {
        getPasswordHash: 'hash4',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName4',
      },
      lastName: {
        getLastName: 'LastName4',
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
        getBiography: 'A nice person 4.',
      },
      roles: ['Admin'],
      profilePicture: null,
      deletedAt: {
        getMilliseconds: 4,
      },
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-5',
      },
      email: {
        getEmail: 'email5@email.com',
      },
      username: {
        getUsername: 'John_Doe_5',
      },
      passwordHash: {
        getPasswordHash: 'hash5',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName5',
      },
      lastName: {
        getLastName: 'LastName5',
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
        getBiography: 'A nice person 5.',
      },
      roles: ['Admin'],
      profilePicture: {
        getUrl: 'https://www.example.com/5.jpg',
      },
      deletedAt: null,
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-6',
      },
      email: {
        getEmail: 'email6@email.com',
      },
      username: {
        getUsername: 'John_Doe_6',
      },
      passwordHash: {
        getPasswordHash: 'hash6',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName6',
      },
      lastName: {
        getLastName: 'LastName6',
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
        getBiography: 'A nice person 6.',
      },
      roles: ['Admin'],
      profilePicture: null,
      deletedAt: null,
    } as MockedObject<User>,
  ],
  [
    {
      id: {
        getId: 'id-7',
      },
      email: {
        getEmail: 'email7@email.com',
      },
      username: {
        getUsername: 'John_Doe_7',
      },
      passwordHash: {
        getPasswordHash: 'hash7',
      },
      isVerified: true,
      isBlocked: false,
      firstName: {
        getFirstName: 'FirstName7',
      },
      lastName: {
        getLastName: 'LastName7',
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
        getBiography: 'A nice person 7.',
      },
      roles: ['Admin'],
      profilePicture: null,
      deletedAt: null,
    } as MockedObject<User>,
  ],
];

describe('users', () => {
  describe('application', () => {
    describe('mappings', () => {
      describe('User to OutputUserDto', () => {
        test.each(validValues)(
          'should map User to OutputUserDto keeping all the property values',
          (user: User) => {
            // Arrange

            // Act
            const dto = userToOutputUserDto(user);

            // Assert
            expect(dto.id).toBe(user.id.getId);
            expect(dto.email).toBe(user.email.getEmail);
            expect(dto.username).toBe(user.username.getUsername);
            expect(dto.isVerified).toBe(user.isVerified);
            expect(dto.isBlocked).toBe(user.isBlocked);
            expect(dto.firstName).toBe(user.firstName.getFirstName);
            expect(dto.lastName).toBe(user.lastName.getLastName);
            expect(dto.birthday).toBe(user.birthday.getMilliseconds);
            expect(dto.createdAt).toBe(user.createdAt.getMilliseconds);
            expect(dto.updatedAt).toBe(user.updatedAt.getMilliseconds);
            expect(dto.biography).toBe(user.biography.getBiography);
            for (let i = 0; i < user.roles.length; i++) {
              expect(dto.roles[i]).toBe(user.roles[i]);
            }
            if (user.profilePicture)
              expect(dto.profilePicture).toBe(user.profilePicture.getUrl);
            else expect(dto.profilePicture).toBeNull();
            if (user.deletedAt)
              expect(dto.deletedAt).toBe(user.deletedAt.getMilliseconds);
            else expect(dto.deletedAt).toBeNull();
          },
        );
      });
    });
  });
});
