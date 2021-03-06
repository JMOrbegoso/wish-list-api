import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByUsernameQuery } from '..';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { Username } from '../../../domain/value-objects';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUserByUsernameQuery)
export class GetUserByUsernameHandler
  implements IQueryHandler<GetUserByUsernameQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByUsernameQuery): Promise<OutputUserDto> {
    const username = Username.create(query.username);

    const user: User = await this.userRepository.getOneByUsername(username);

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
