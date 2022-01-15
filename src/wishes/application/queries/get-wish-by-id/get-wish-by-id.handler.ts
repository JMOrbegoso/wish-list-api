import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWishByIdQuery } from '..';
import { WishId } from '../../../domain/entities';
import { WishRepository } from '../../../domain/repositories';
import { OutputWishDto } from '../../dtos';
import { wishToOutputWishDto } from '../../mappings';

@QueryHandler(GetWishByIdQuery)
export class GetWishByIdHandler implements IQueryHandler<GetWishByIdQuery> {
  constructor(private readonly wishRepository: WishRepository) {}

  async execute(query: GetWishByIdQuery): Promise<OutputWishDto> {
    const wishId = WishId.create(query.id);

    const wish = await this.wishRepository.getOneById(wishId);

    if (!wish) throw new NotFoundException();

    return wishToOutputWishDto(wish);
  }
}
