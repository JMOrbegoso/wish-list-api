import { AggregateRoot } from '../../../../core/domain/entities';
import { UniqueId } from '../../../../core/domain/value-objects';
import { WishStage, Wisher } from '..';
import {
  WishTitle,
  WishDescription,
  WishPrivacyLevel,
  CategoryName,
  WishDateMetadata,
  WebUrl,
} from '../../value-objects';

export class Wish extends AggregateRoot {
  id: UniqueId;

  private title: WishTitle;
  private description: WishDescription;
  private privacyLevel: WishPrivacyLevel;
  private createdAt: WishDateMetadata;
  private updatedAt: WishDateMetadata;
  private wisher: Wisher;
  private urls: WebUrl[];
  private imageUrls: WebUrl[];
  private categories: CategoryName[];
  private stages: WishStage[];
  private deletedAt?: WishDateMetadata;
  private completedAt?: WishDateMetadata;

  private constructor(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    privacyLevel: WishPrivacyLevel,
    createdAt: WishDateMetadata,
    updatedAt: WishDateMetadata,
    wisher: Wisher,
    urls: WebUrl[],
    imageUrls: WebUrl[],
    categories: CategoryName[],
    stages: WishStage[],
    deletedAt?: WishDateMetadata,
    completedAt?: WishDateMetadata,
  ) {
    super(id);

    this.title = title;
    this.description = description;
    this.privacyLevel = privacyLevel;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.wisher = wisher;
    this.urls = urls;
    this.imageUrls = imageUrls;
    this.categories = categories;
    this.stages = stages;
    this.deletedAt = deletedAt;
    this.completedAt = completedAt;
  }

  public static create(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    privacyLevel: WishPrivacyLevel,
    createdAt: WishDateMetadata,
    updatedAt: WishDateMetadata,
    wisher: Wisher,
    urls: WebUrl[] = [],
    imageUrls: WebUrl[] = [],
    categories: CategoryName[] = [],
    stages: WishStage[] = [],
    deletedAt: WishDateMetadata = null,
    completedAt: WishDateMetadata = null,
  ): Wish {
    return new Wish(
      id,
      title,
      description,
      privacyLevel,
      createdAt,
      updatedAt,
      wisher,
      urls,
      imageUrls,
      categories,
      stages,
      deletedAt,
      completedAt,
    );
  }

  public get getId(): UniqueId {
    return this.id;
  }

  public get getTitle(): WishTitle {
    return this.title;
  }

  public get getDescription(): WishDescription {
    return this.description;
  }

  public get getPrivacyLevel(): WishPrivacyLevel {
    return this.privacyLevel;
  }

  public get getCreatedAtDate(): WishDateMetadata {
    return this.createdAt;
  }

  public get getUpdatedAtDate(): WishDateMetadata {
    return this.updatedAt;
  }

  public get getWisher(): Wisher {
    return this.wisher;
  }

  public get getUrls(): WebUrl[] {
    return this.urls;
  }

  public get getImageUrls(): WebUrl[] {
    return this.imageUrls;
  }

  public get getCategories(): CategoryName[] {
    return this.categories;
  }

  public get getStages(): WishStage[] {
    return this.stages;
  }

  public get getDeletedAtDate(): WishDateMetadata {
    return this.deletedAt;
  }

  public get getCompletedAtDate(): WishDateMetadata {
    return this.completedAt;
  }

  public get isCompleted(): boolean {
    return !this.completedAt;
  }

  public get isDeleted(): boolean {
    return !this.deletedAt;
  }
}
