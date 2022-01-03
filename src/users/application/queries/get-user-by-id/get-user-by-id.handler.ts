import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '..';
import { UniqueId } from '../../../../shared/domain/value-objects';
import { User } from '../../../domain/entities';
import { UserRepository } from '../../../domain/repositories';
import { OutputUserDto } from '../../dtos';
import { userToOutputUserDto } from '../../mappings';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: GetUserByIdQuery): Promise<OutputUserDto> {
    const id = UniqueId.create(query.id);

    const user: User = await this.userRepository.getOneById(id);

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
