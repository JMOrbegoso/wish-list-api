import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NotFoundException } from '@nestjs/common';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { UniqueId } from '../../../../core/domain/value-objects';
import { userToOutputUserDto } from '../../mappings';
import { GetUserByIdQuery } from '..';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByIdQuery): Promise<OutputUserDto> {
    const id = UniqueId.create(query.id);

    const user: User = await this.unitOfWork.userRepository.getOne(id);

    if (!user) throw new NotFoundException();

    return userToOutputUserDto(user);
  }
}
