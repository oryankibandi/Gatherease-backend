import bcrypt from 'bcrypt';
import appConfig from '../config';
import { IHashGenerator } from './types/interfaces';

export default class HashGenerator implements IHashGenerator {
  bcrypt = bcrypt;

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, parseInt(appConfig.hashing.SALT_ROUNDS));
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
