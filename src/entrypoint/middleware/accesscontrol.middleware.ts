import { Organizer, ROLE, User } from '@prisma/client';
import { AccessControl, Permission, Query } from 'accesscontrol';
import { NextFunction, Request, Response } from 'express';

const ac = new AccessControl();

const organizer = ROLE.ORGANIZER;
const user = ROLE.USER;

ac.grant(organizer).resource('event').create().readAny().updateOwn().deleteOwn().readOwn();
ac.grant(organizer).resource('eventImage').create().deleteOwn().updateOwn().readAny();
ac.grant(user).resource('event').readAny();

export function grantAccess(action: keyof Query, resource: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        mesage: 'Unauthorized',
      });
    }
    const permission = ac.can(req.user.role)[action](resource) as Permission;

    if (!permission.granted) {
      return res.status(401).json({
        mesage: 'Unauthorized',
      });
    } else {
      return next();
    }
  };
}
