import {
  Body,
  Controller,
  Get,
  HttpCode,
  Ip,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  LocalLoginCommand,
  RefreshAccessTokenCommand,
  VerifyUserCommand,
} from '../../application/commands';
import { AuthTokensDto } from '../../application/dtos';
import { LoginDto, RefreshTokenDto } from '../dtos';

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

  @Get('verify')
  async verify(@Query('code') code: string): Promise<void> {
    const command = new VerifyUserCommand(code);
    await this.commandBus.execute(command);
  }
}
