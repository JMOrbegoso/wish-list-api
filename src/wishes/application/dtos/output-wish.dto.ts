import { PrivacyLevel } from '../../../wishes/domain/value-objects';
import { OutputWishStageDto } from '.';

export class OutputWishDto {
  id: string;

  wisherId: string;

  title: string;

  description: string;

  privacyLevel: PrivacyLevel;

  createdAt: string;

  updatedAt: string;

  urls: string[];

  imageUrls: string[];

  categories: string[];

  stages: OutputWishStageDto[];

  deletedAt?: string;

  startedAt?: string;

  completedAt?: string;
}
