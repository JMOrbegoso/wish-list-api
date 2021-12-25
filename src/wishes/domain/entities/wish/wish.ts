import {
  DeletedWishCannotBeUpdatedError,
  DuplicatedWishStageError,
  InvalidWishCategoriesError,
  InvalidWishImagesError,
  InvalidWishStagesError,
  InvalidWishUrlsError,
  InvalidWisherError,
  NonExistentWishStageError,
  TooManyWishCategoriesError,
  TooManyWishImagesError,
  TooManyWishStagesError,
  TooManyWishUrlsError,
  WishIsAlreadyCompletedError,
  WishIsAlreadyDeletedError,
  WishIsAlreadyUncompletedError,
  WishIsNotDeletedError,
  WishStage,
  Wisher,
} from '..';
import { AggregateRoot } from '../../../../shared/domain/entities';
import {
  InvalidMillisecondsDateError,
  MillisecondsDate,
  UniqueId,
  WebUrl,
} from '../../../../shared/domain/value-objects';
import {
  CategoryName,
  InvalidWishDescriptionError,
  InvalidWishPrivacyLevelError,
  InvalidWishTitleError,
  WishDescription,
  WishPrivacyLevel,
  WishTitle,
} from '../../value-objects';

export class Wish extends AggregateRoot {
  public static readonly MaxUrls = 5;
  public static readonly MaxImages = 5;
  public static readonly MaxCategories = 5;
  public static readonly MaxStages = 5;

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

    if (!title) throw new InvalidWishTitleError();
    if (!description) throw new InvalidWishDescriptionError();
    if (!privacyLevel) throw new InvalidWishPrivacyLevelError();
    if (!createdAt) throw new InvalidMillisecondsDateError();
    if (!updatedAt) throw new InvalidMillisecondsDateError();
    if (!wisher) throw new InvalidWisherError();
    if (!urls) throw new InvalidWishUrlsError();
    if (urls.length > Wish.MaxUrls) throw new TooManyWishUrlsError();
    if (!imageUrls) throw new InvalidWishImagesError();
    if (imageUrls.length > Wish.MaxImages) throw new TooManyWishImagesError();
    if (!categories) throw new InvalidWishCategoriesError();
    if (categories.length > Wish.MaxCategories)
      throw new TooManyWishCategoriesError();
    if (!stages) throw new InvalidWishStagesError();
    if (stages.length > Wish.MaxStages) throw new TooManyWishStagesError();
    if (!deletedAt) deletedAt = null;
    if (!completedAt) completedAt = null;

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
    return [...this._urls];
  }

  public get imageUrls(): WebUrl[] {
    return [...this._imageUrls];
  }

  public get categories(): CategoryName[] {
    return [...this._categories];
  }

  public get stages(): WishStage[] {
    return [...this._stages];
  }

  public get deletedAt(): MillisecondsDate {
    return this._deletedAt;
  }

  public get completedAt(): MillisecondsDate {
    return this._completedAt;
  }

  public get isCompleted(): boolean {
    return !!this._completedAt;
  }

  public get isDeleted(): boolean {
    return !!this._deletedAt;
  }

  public delete(): void {
    if (this.isDeleted) throw new WishIsAlreadyDeletedError();

    this._deletedAt = MillisecondsDate.create();
  }

  public undelete(): void {
    if (!this.isDeleted) throw new WishIsNotDeletedError();

    this._deletedAt = null;
  }

  public complete(completedAt: MillisecondsDate): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    if (this.isCompleted) throw new WishIsAlreadyCompletedError();

    if (!completedAt) throw new InvalidMillisecondsDateError();

    this._completedAt = completedAt;
    this._updatedAt = MillisecondsDate.create();
  }

  public uncomplete(): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    if (!this.isCompleted) throw new WishIsAlreadyUncompletedError();

    this._completedAt = null;
    this._updatedAt = MillisecondsDate.create();
  }

  public changePrivacyLevel(wishPrivacyLevel: WishPrivacyLevel): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    if (!wishPrivacyLevel) throw new InvalidWishPrivacyLevelError();

    this._privacyLevel = wishPrivacyLevel;
  }

  public update(
    title: WishTitle,
    description: WishDescription,
    urls: WebUrl[] = [],
    imageUrls: WebUrl[] = [],
    categories: CategoryName[] = [],
  ): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    if (!title) throw new InvalidWishTitleError();

    if (!description) throw new InvalidWishDescriptionError();

    if (!urls) throw new InvalidWishUrlsError();

    if (urls.length > Wish.MaxUrls) throw new TooManyWishUrlsError();

    if (!imageUrls) throw new InvalidWishImagesError();

    if (imageUrls.length > Wish.MaxImages) throw new TooManyWishImagesError();

    if (!categories) throw new InvalidWishCategoriesError();

    if (categories.length > Wish.MaxCategories)
      throw new TooManyWishCategoriesError();

    this._title = title;
    this._description = description;
    this._urls = urls;
    this._imageUrls = imageUrls;
    this._categories = categories;

    this._updatedAt = MillisecondsDate.create();
  }

  public addStage(newStage: WishStage): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    if (!newStage) throw new InvalidWishStagesError();

    if (this._stages.length === Wish.MaxStages)
      throw new TooManyWishStagesError();

    if (this._stages.some((stage) => stage.equals(newStage)))
      throw new DuplicatedWishStageError();

    this._stages.push(newStage);

    this._updatedAt = MillisecondsDate.create();
  }

  public updateStage(
    id: UniqueId,
    title: WishTitle,
    description: WishDescription,
    urls: WebUrl[] = [],
    imageUrls: WebUrl[] = [],
  ): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    const wishStage = this._stages.find((stage) => stage.id.equals(id));
    if (!wishStage) throw new NonExistentWishStageError();

    wishStage.update(title, description, urls, imageUrls);

    this._updatedAt = MillisecondsDate.create();
  }

  public removeStage(stageToRemove: WishStage): void {
    if (this.isDeleted) throw new DeletedWishCannotBeUpdatedError();

    if (!stageToRemove) throw new InvalidWishStagesError();

    if (!this._stages.some((stage) => stage.equals(stageToRemove)))
      throw new NonExistentWishStageError();

    this._stages = this._stages.filter((stage) => !stage.equals(stageToRemove));

    this._updatedAt = MillisecondsDate.create();
  }
}
