import Joi from "joi";

export const itemValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  ean: Joi.string().length(13).required().pattern(new RegExp("^[0-9]+$")),
  sku: Joi.string().length(8).required().pattern(new RegExp("^[0-9]+$")),
});
