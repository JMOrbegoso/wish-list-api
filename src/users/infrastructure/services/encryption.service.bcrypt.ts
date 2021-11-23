import { EncryptionService } from '../../application/services/encryption.service';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';

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
