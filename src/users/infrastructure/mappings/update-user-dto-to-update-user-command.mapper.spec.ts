import { mocked } from 'ts-jest/utils';
import { updateUserDtoToUpdateUserCommand } from '.';
import { UpdateUserDto } from '../dtos';

const validValues = [
  [
    mocked<UpdateUserDto>({
      id: 'id-0',
      firstName: 'FirstName0',
      lastName: 'LastName0',
      birthday: 1,
      biography: 'A nice person 0.',
      profilePicture: 'https://www.example.com/0.jpg',
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-1',
      firstName: 'FirstName1',
      lastName: 'LastName1',
      birthday: 1,
      biography: null,
      profilePicture: 'https://www.example.com/1.jpg',
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-2',
      firstName: 'FirstName2',
      lastName: 'LastName2',
      birthday: 1,
      biography: 'A nice person 2.',
      profilePicture: null,
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-3',
      firstName: 'FirstName3',
      lastName: 'LastName3',
      birthday: 1,
      biography: 'A nice person 3.',
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-4',
      firstName: 'FirstName4',
      lastName: 'LastName4',
      birthday: 1,
      biography: null,
      profilePicture: null,
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-5',
      firstName: 'FirstName5',
      lastName: 'LastName5',
      birthday: 1,
      biography: null,
      profilePicture: 'https://www.example.com/5.jpg',
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-6',
      firstName: 'FirstName6',
      lastName: 'LastName6',
      birthday: 1,
      biography: 'A nice person 6.',
      profilePicture: null,
    } as unknown as UpdateUserDto),
  ],
  [
    mocked<UpdateUserDto>({
      id: 'id-7',
      firstName: 'FirstName7',
      lastName: 'LastName7',
      birthday: 1,
    } as unknown as UpdateUserDto),
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('UpdateUserDto to UpdateUserCommand', () => {
        test.each(validValues)(
          'should map UpdateUserDto to UpdateUserCommand keeping all the property values',
          (dto: UpdateUserDto) => {
            // Arrange

            // Act
            const command = updateUserDtoToUpdateUserCommand(dto);

            // Assert
            expect(command.id).toBe(dto.id);
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
