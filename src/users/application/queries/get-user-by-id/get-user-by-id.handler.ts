import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { UnitOfWork } from '../../../../core/domain/repositories';
import { User } from '../../../../users/domain/entities';
import { OutputUserDto } from '../../dtos';
import { UniqueId } from '../../../../core/domain/value-objects';
import { Mapper } from '../../mappings';
import { GetUserByIdQuery } from '..';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly unitOfWork: UnitOfWork) {}

  async execute(query: GetUserByIdQuery): Promise<OutputUserDto> {
    const id = UniqueId.create(query.id);

    const user: User = await this.unitOfWork.userRepository.getOne(id);

    return Mapper.toOutputUserDto(user);
  }
}
