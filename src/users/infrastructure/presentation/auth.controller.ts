import { Body, Controller, HttpCode, Ip, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  AddVerificationCodeCommand,
  LocalLoginCommand,
  RefreshAccessTokenCommand,
  VerifyUserCommand,
} from '../../application/commands';
import { AuthTokensDto } from '../../application/dtos';
import {
  LoginDto,
  RefreshTokenDto,
  UserEmailDto,
  VerificationCodeDto,
} from '../dtos';

@Controller()
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginDto,
    @Ip() ipAddress: string,
  ): Promise<AuthTokensDto> {
    const command = new LocalLoginCommand(
      dto.username,
      dto.password,
      ipAddress,
    );
    return await this.commandBus.execute(command);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Body() dto: RefreshTokenDto,
    @Ip() ipAddress: string,
  ): Promise<AuthTokensDto> {
    const command = new RefreshAccessTokenCommand(dto.refresh_token, ipAddress);
    return await this.commandBus.execute(command);
  }

  @Post('verify')
  @HttpCode(200)
  async verify(@Body() dto: VerificationCodeDto): Promise<void> {
    const command = new VerifyUserCommand(dto.code);
    await this.commandBus.execute(command);
  }

  @Post('add-verification-code')
  @HttpCode(200)
  async addVerificationCode(@Body() dto: UserEmailDto): Promise<void> {
    const command = new AddVerificationCodeCommand(dto.email);
    await this.commandBus.execute(command);
  }
}
