import { SearchCategoryValidationInput, Joi } from './base.validator';

export function searchCategoryValidation(data: SearchCategoryValidationInput) {
  const schema = Joi.object({
    name: Joi.string(),
    count: Joi.number(),
    page: Joi.number(),
  });

  return schema.validate(data);
}
