import Joi from 'joi'

export const orderCreateValidator = Joi.object({
  orderNumber: Joi.string().required(),
  orderCreated: Joi.date(),
  carrier: Joi.string().required(),
  carrierService: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  deliveryAddress: Joi.string().required(),
  deliveryPhone: Joi.string().required(),
  deliveryEmail: Joi.string().email().required(),
  items: Joi.array().items(Joi.string().uuid()).min(1).max(100).required(),
})

export const orderUpdateValidator = Joi.object({
  orderNumber: Joi.forbidden(),
  orderCreated: Joi.forbidden(),
  carrier: Joi.string(),
  carrierService: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  deliveryAddress: Joi.string(),
  deliveryPhone: Joi.string(),
  deliveryEmail: Joi.string().email(),
  items: Joi.array().items(Joi.string().uuid()).min(1).max(100),
})
