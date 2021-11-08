export abstract class EncryptionService {
  abstract passwordMatch(password: string, hash: string): boolean;

  abstract hashPassword(password: string): string;
}
