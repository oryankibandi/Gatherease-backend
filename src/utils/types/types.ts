import { ROLE } from '@prisma/client';

export interface GenerateTokenPairInput {
  ownerId: string;
  token: string;
  role: ROLE;
}

export interface TokenPairOutput {
  accessToken: string;
  refreshToken: string;
}
