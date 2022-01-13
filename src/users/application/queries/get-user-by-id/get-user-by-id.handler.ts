import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '..';
import { User, UserId } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<OutputUserDto> {
    const userId = UserId.create(query.id);

    const user: User = await this.userRepository.getOneById(userId);

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
