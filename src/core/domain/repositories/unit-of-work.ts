export interface UnitOfWork {
	commitChanges(): Promise<void>;
}
