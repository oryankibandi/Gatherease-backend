import { ROLE } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { organizerRepo, userRepo } from '../../adapters/repositories';
import { jwtGenerator } from '../../utils';

/**
 * Decodes access token ans sets req.user to the respective user
 */
export async function decodeAccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const decoded = jwtGenerator.verifyAccessToken(req.headers['x-auth-token'] as string);

    if (decoded.role === ROLE.USER) {
      const user = await userRepo.getUserById(decoded.ownerId);

      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      req.user = user;

      return next();
    } else if (decoded.role === ROLE.ORGANIZER) {
      const user = await organizerRepo.getOrganizerById(decoded.ownerId);

      if (!user) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      req.user = user;

      return next();
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }
}
