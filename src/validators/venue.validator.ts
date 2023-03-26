import { SearchEventvalidationInput, Joi } from './base.validator';

export function searchVenueInputValidation(data: SearchEventvalidationInput) {
  const schema = Joi.object({
    city: Joi.string(),
    name: Joi.string(),
    country: Joi.string(),
    longitude: Joi.string(),
    latitude: Joi.string(),
    count: Joi.number(),
    page: Joi.number(),
  });

  return schema.validate(data);
}
