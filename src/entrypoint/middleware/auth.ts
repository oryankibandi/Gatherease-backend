import { ROLE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { organizerRepo, tokenRepo, userRepo } from '../../adapters/repositories';
import { jwtGenerator } from '../../utils';
import redisClientService from '../../adapters/cache';

/**
 * Decodes access token ans sets req.user to the respective user
 */
export async function decodeAccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const decoded = jwtGenerator.verifyAccessToken(req.headers['x-auth-token'] as string);

    if (decoded.role === ROLE.USER) {
      const redisUser = await redisClientService.retrieveUser(decoded?.accessToken as string);

      if (redisUser) {
        req.user = redisUser;
        return next();
      }
      const retrievedToken = await tokenRepo.getToken(decoded.accessToken as string);

      if (!retrievedToken) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      const user = await userRepo.getUserById(retrievedToken.ownerId);

      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      req.user = user;
      req.token = retrievedToken.token;

      return next();
    } else if (decoded.role === ROLE.ORGANIZER) {
      const redisUser = await redisClientService.retrieveUser(decoded?.accessToken as string);

      if (redisUser) {
        req.user = redisUser;
        return next();
      }
      const retrievedToken = await tokenRepo.getToken(decoded.accessToken as string);

      if (!retrievedToken) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }
      const user = await organizerRepo.getOrganizerById(retrievedToken.ownerId);

      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      req.user = user;
      req.token = retrievedToken.token;

      return next();
    }
  } catch (error: any) {
    return res.status(401).json({
      message: error.message.toUpperCase(),
    });
  }
}
