import Joi from 'joi'

export const orderValidator = Joi.object({
  orderNumber: Joi.string().required(),
  orderCreated: Joi.date().required(),
  carrier: Joi.string().required(),
  carrierService: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
  deliveryPhone: Joi.string().required(),
  deliveryEmail: Joi.string().email().required(),
  items: Joi.array().items(Joi.string().uuid()).min(1).max(100).required(),
})
