import { MockedObject } from 'ts-jest/dist/utils/testing';
import { UpdateUserPasswordDto } from '../dtos';
import { updateUserPasswordDtoToUpdateUserPasswordCommand } from '.';

const validValues = [
  [
    {
      id: 'id-0',
      password: 'password0',
    } as MockedObject<UpdateUserPasswordDto>,
  ],
  [
    {
      id: 'id-1',
      password: 'password1',
    } as MockedObject<UpdateUserPasswordDto>,
  ],
  [
    {
      id: 'id-2',
      password: 'password2',
    } as MockedObject<UpdateUserPasswordDto>,
  ],
  [
    {
      id: 'id-3',
      password: 'password3',
    } as MockedObject<UpdateUserPasswordDto>,
  ],
];

describe('users', () => {
  describe('infrastructure', () => {
    describe('mappings', () => {
      describe('UpdateUserDto to UpdateUserCommand', () => {
        test.each(validValues)(
          'should map UpdateUserPasswordDto to UpdateUserPasswordCommand keeping all the property values',
          (dto: UpdateUserPasswordDto) => {
            // Arrange

            // Act
            const command =
              updateUserPasswordDtoToUpdateUserPasswordCommand(dto);

            // Assert
            expect(command.id).toBe(dto.id);
            expect(command.password).toBe(dto.password);
          },
        );
      });
    });
  });
});
