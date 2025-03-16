import Joi from 'joi'

export const productStockValidator = Joi.object({
  quantity: Joi.number().integer().min(1).required(),
})
