import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  async hashPassword(password: string) {
    const saltOrRounds = 10;

    const result = await bcrypt.hash(password, saltOrRounds);

    return result;
  }

  async comparePassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}
