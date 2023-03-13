import { Joi, UserConfirmationValidationInput, UserRegistrationValidationInput } from './base.validator';

const schemaValues = {
  phone: Joi.string().phoneNumber({ defaultCountry: 'KE', format: 'e164' }).required(),
  code: Joi.string().required(),
}

export function userRegistrationValidation(data: UserRegistrationValidationInput) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().phoneNumber({ defaultCountry: 'KE', format: 'e164' }).required(),
    password: Joi.string().min(8).max(20).required(),
  });

  return schema.validate(data);
}

export function userConfirmationValidation(data: UserConfirmationValidationInput) {
  const schema = Joi.object({
    code: schemaValues.code,
    phone: schemaValues.phone
  });

  return schema.validate(data);
}