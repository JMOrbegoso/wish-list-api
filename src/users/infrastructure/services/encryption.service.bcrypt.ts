import { Injectable } from '@nestjs/common';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { EncryptionService } from '../../application/services/encryption.service';

@Injectable()
export class EncryptionServiceBcrypt implements EncryptionService {
  public passwordMatch(password: string, hash: string): boolean {
    return compareSync(password, hash);
  }

  public hashPassword(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
}
