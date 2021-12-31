import { IsNotEmpty, IsString } from 'class-validator';

export class VerificationCodeDto {
  @IsString()
  @IsNotEmpty()
  code: string;
}
