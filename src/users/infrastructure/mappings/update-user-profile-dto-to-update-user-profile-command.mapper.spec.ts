import { mocked } from 'ts-jest/utils';
import { UpdateUserProfileDto } from '../dtos';
import { updateUserProfileDtoToUpdateUserProfileCommand } from '.';

const validValues = [
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-0',
      firstName: 'FirstName0',
      lastName: 'LastName0',
      birthday: 1,
      biography: 'A nice person 0.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-1',
      firstName: 'FirstName1',
      lastName: 'LastName1',
      birthday: 1,
      biography: 'A nice person 1.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-2',
      firstName: 'FirstName2',
      lastName: 'LastName2',
      birthday: 1,
      biography: 'A nice person 2.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-3',
      firstName: 'FirstName3',
      lastName: 'LastName3',
      birthday: 1,
      biography: 'A nice person 3.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-4',
      firstName: 'FirstName4',
      lastName: 'LastName4',
      birthday: 1,
      biography: 'A nice person 4.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-5',
      firstName: 'FirstName5',
      lastName: 'LastName5',
      birthday: 1,
      biography: 'A nice person 5.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-6',
      firstName: 'FirstName6',
      lastName: 'LastName6',
      birthday: 1,
      biography: 'A nice person 6.',
    } as unknown as UpdateUserProfileDto),
  ],
  [
    mocked<UpdateUserProfileDto>({
      id: 'id-7',
      firstName: 'FirstName7',
      lastName: 'LastName7',
      birthday: 1,
    } as unknown as UpdateUserProfileDto),
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('UpdateUserProfileDto to UpdateUserProfileCommand', () => {
        test.each(validValues)(
          'should map UpdateUserProfileDto to UpdateUserProfileCommand keeping all the property values',
          (dto: UpdateUserProfileDto) => {
            // Arrange

            // Act
            const command = updateUserProfileDtoToUpdateUserProfileCommand(dto);

            // Assert
            expect(command.id).toBe(dto.id);
            expect(command.firstName).toBe(dto.firstName);
            expect(command.lastName).toBe(dto.lastName);
            expect(command.birthday).toBe(dto.birthday);
            expect(command.biography).toBe(dto.biography);
          },
        );
      });
    });
  });
});
