import { NextFunction, Request, Response } from 'express';

/**
 * Decodes access token ans sets req.user to the respective user
 */
export async function decodeAccessToken(req: Request, res: Response, next: NextFunction) {}
