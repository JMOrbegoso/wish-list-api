import { mocked } from 'ts-jest/utils';
import { updateUserPasswordDtoToUpdateUserPasswordCommand } from '.';
import { UpdateUserPasswordDto } from '../dtos';

const validValues = [
  [
    mocked<UpdateUserPasswordDto>({
      id: 'id-0',
      password: 'password0',
    } as unknown as UpdateUserPasswordDto),
  ],
  [
    mocked<UpdateUserPasswordDto>({
      id: 'id-1',
      password: 'password1',
    } as unknown as UpdateUserPasswordDto),
  ],
  [
    mocked<UpdateUserPasswordDto>({
      id: 'id-2',
      password: 'password2',
    } as unknown as UpdateUserPasswordDto),
  ],
  [
    mocked<UpdateUserPasswordDto>({
      id: 'id-3',
      password: 'password3',
    } as unknown as UpdateUserPasswordDto),
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
