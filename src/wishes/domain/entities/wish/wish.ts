import { AggregateRoot } from '../../../../core/domain/entities';
import {
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../core/domain/value-objects';
import { WishStage, Wisher } from '..';
import {
  CategoryName,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
} from '../../value-objects';

export class Wish extends AggregateRoot {
  private _title: WishTitle;
  private _description: WishDescription;
  private _privacyLevel: WishPrivacyLevel;
  private _createdAt: MillisecondsDate;
  private _updatedAt: MillisecondsDate;
  private _wisher: Wisher;
  private _urls: WebUrl[];
  private _imageUrls: WebUrl[];
  private _categories: CategoryName[];
  private _stages: WishStage[];
  private _deletedAt?: MillisecondsDate;
  private _completedAt?: MillisecondsDate;

  private constructor(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    privacyLevel: WishPrivacyLevel,
    createdAt: MillisecondsDate,
    updatedAt: MillisecondsDate,
    wisher: Wisher,
    urls: WebUrl[],
    imageUrls: WebUrl[],
    categories: CategoryName[],
    stages: WishStage[],
    deletedAt?: MillisecondsDate,
    completedAt?: MillisecondsDate,
  ) {
    super(id);

    this._title = title;
    this._description = description;
    this._privacyLevel = privacyLevel;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
    this._wisher = wisher;
    this._urls = urls;
    this._imageUrls = imageUrls;
    this._categories = categories;
    this._stages = stages;
    this._deletedAt = deletedAt;
    this._completedAt = completedAt;
  }

  public static create(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    privacyLevel: WishPrivacyLevel,
    createdAt: MillisecondsDate,
    updatedAt: MillisecondsDate,
    wisher: Wisher,
    urls: WebUrl[] = [],
    imageUrls: WebUrl[] = [],
    categories: CategoryName[] = [],
    stages: WishStage[] = [],
    deletedAt: MillisecondsDate = null,
    completedAt: MillisecondsDate = null,
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

  public get id(): UniqueId {
    return this._id;
  }

  public get title(): WishTitle {
    return this._title;
  }

  public get description(): WishDescription {
    return this._description;
  }

  public get privacyLevel(): WishPrivacyLevel {
    return this._privacyLevel;
  }

  public get createdAt(): MillisecondsDate {
    return this._createdAt;
  }

  public get updatedAt(): MillisecondsDate {
    return this._updatedAt;
  }

  public get wisher(): Wisher {
    return this._wisher;
  }

  public get urls(): WebUrl[] {
    return this._urls;
  }

  public get imageUrls(): WebUrl[] {
    return this._imageUrls;
  }

  public get categories(): CategoryName[] {
    return this._categories;
  }

  public get stages(): WishStage[] {
    return this._stages;
  }

  public get deletedAt(): MillisecondsDate {
    return this._deletedAt;
  }

  public get completedAt(): MillisecondsDate {
    return this._completedAt;
  }

  public get isCompleted(): boolean {
    return !this._completedAt;
  }

  public get isDeleted(): boolean {
    return !this._deletedAt;
  }
}
