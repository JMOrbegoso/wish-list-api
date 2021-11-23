import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LocalLoginCommand } from '../../application/commands';
import { OutputUserDto } from '../../application/dtos';

@Injectable()
export class LocalLoginPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private commandBus: CommandBus) {
    super();
  }

  async validate(username: string, password: string): Promise<OutputUserDto> {
    const command = new LocalLoginCommand(username, password);

    return await this.commandBus.execute(command);
  }
}
