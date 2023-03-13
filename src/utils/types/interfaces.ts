import { GenerateTokenPairInput, TokenPairOutput } from './types';

export interface IJwtGenerator {
  generateTokenPair(payload: GenerateTokenPairInput): TokenPairOutput;

  verifyAccessToken(token: string): any;

  verifyRefreshToken(token: string): any;
}

export interface IHashGenerator {
  hashPassword(password: string): Promise<string>;

  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface ICodeGenerator {
  generatePhoneVerificationCode(): string;
}
