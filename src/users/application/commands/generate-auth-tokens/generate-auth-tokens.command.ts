import { OutputUserDto } from '../../dtos';

export class GenerateAuthTokensCommand {
  constructor(
    public readonly outputUserDto: OutputUserDto,
    public readonly ipAddress: string,
  ) {}
}
