import jwt from 'jsonwebtoken';
import { GenerateTokenPairInput, TokenPairOutput } from './types/types';
import appConfig from '../config';
import { IJwtGenerator } from './types/interfaces';

export default class JwtGenerator implements IJwtGenerator {
  generateTokenPair(payload: GenerateTokenPairInput): TokenPairOutput {
    const accessToken = jwt.sign(payload, appConfig.jwt.ACCESS_TOKEN_SECRET, {
      expiresIn: appConfig.jwt.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign(payload, appConfig.jwt.REFRESH_TOKEN_SECRET, {
      expiresIn: appConfig.jwt.REFRESH_TOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, appConfig.jwt.ACCESS_TOKEN_SECRET);
  }

  verifyRefreshToken(token: string) {
    return jwt.verify(token, appConfig.jwt.REFRESH_TOKEN_SECRET);
  }
}
