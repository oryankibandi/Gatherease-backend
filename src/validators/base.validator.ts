import joi, { Root } from 'joi';
import jpn from 'joi-phone-number';

export const Joi: Root = joi.extend(jpn);

export interface UserRegistrationValidationInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserConfirmationValidationInput {
  code: string;
  phone: string;
}

export interface OrganizerLoginValidationInput {
  email: string;
  password: string;
}

export interface UserLoginValidationInput {
  email: string;
  password: string;
}

export interface organizerRefreshTokenValidationInput {
  ownerId: string;
  role: string;
  refreshToken: string;
}
