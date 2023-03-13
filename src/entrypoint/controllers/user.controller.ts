import { Request, Response } from 'express';
import { userConfirmationValidation, userRegistrationValidation } from '../../validators/user.validator';
import { userAuthService } from '../../services/user';
import { ServiceError } from '../../services/exceptions';

export async function registerUser(req: Request, res: Response) {
  const { error } = userRegistrationValidation(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    const newUser = await userAuthService.registerUser(req.body);
    return res.status(200).json({
      message: 'Verfification code sent.',
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}

export async function userConfirmation(req: Request, res: Response) {
  const { error } = userConfirmationValidation(req.body);

  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    const verified = userAuthService.userConfirmation(req.body);

    return res.status(200).json({
      message: 'confirmation successful. Please sign in.',
    });
  } catch (error) {
    if (error instanceof ServiceError) {
      return res.status(400).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
}
