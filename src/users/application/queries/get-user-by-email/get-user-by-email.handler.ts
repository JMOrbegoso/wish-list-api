import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from '..';
import { User } from '../../../../users/domain/entities';
import { UserRepository } from '../../../../users/domain/repositories';
import { Email } from '../../../../users/domain/value-objects';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByEmailQuery): Promise<OutputUserDto> {
    const email = Email.create(query.email);

    const user: User = await this.userRepository.getOneByEmail(email);

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
