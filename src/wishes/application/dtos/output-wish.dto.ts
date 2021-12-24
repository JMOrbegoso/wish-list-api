import { PrivacyLevel } from '../../../wishes/domain/value-objects';
import { OutputWishStageDto } from '.';

export class OutputWishDto {
  id: string;

  title: string;

  description: string;

  privacyLevel: PrivacyLevel;

  createdAt: number;

  updatedAt: number;

  wisherId: string;

  urls: string[];

  imageUrls: string[];

  categories: string[];

  stages: OutputWishStageDto[];

  deletedAt?: number;

  completedAt?: number;
}
