import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetWishesQuery } from '..';
import { WishRepository } from '../../../domain/repositories';
import { OutputWishDto } from '../../dtos';
import { wishToOutputWishDto } from '../../mappings';

@QueryHandler(GetWishesQuery)
export class GetWishesHandler implements IQueryHandler<GetWishesQuery> {
  constructor(private readonly wishRepository: WishRepository) {}

  async execute(query: GetWishesQuery): Promise<OutputWishDto[]> {
    const {} = query;

    const wishes = await this.wishRepository.getAll();

    return wishes.map((wish) => wishToOutputWishDto(wish));
  }
}
