export abstract class UnitOfWork {
  abstract commitChanges(): Promise<void>;
}
