import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class VerificationCodeDto {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  code: string;
}
