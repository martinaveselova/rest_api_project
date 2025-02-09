import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

export const orderCreateValidator = Joi.object({
  orderNumber: Joi.string().required(),
  orderCreated: Joi.date(),
  carrier: Joi.string().required(),
  carrierService: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  deliveryStreet: Joi.string().required(),
  deliveryZipCode: Joi.string().required(),
  deliveryCity: Joi.string().required(),
  deliveryPhone: Joi.string().required(),
  deliveryEmail: Joi.string().email().required(),
  items: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().uuid().required(),
        quantity: Joi.number().integer().min(1).required(),
      }),
    )
    .min(1)
    .required(),
})

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  const { error } = orderCreateValidator.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((err) => err.message),
    })
  }
  next()
}

export const orderUpdateValidator = Joi.object({
  orderNumber: Joi.forbidden(),
  orderCreated: Joi.forbidden(),
  carrier: Joi.string(),
  carrierService: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  deliveryStreet: Joi.string(),
  deliveryZipCode: Joi.string(),
  deliveryCity: Joi.string(),
  deliveryPhone: Joi.string(),
  deliveryEmail: Joi.string().email(),
  items: Joi.array().items(Joi.string().uuid()).min(1).max(100),
})
