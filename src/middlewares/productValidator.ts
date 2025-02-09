import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

export const productValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  ean: Joi.string().length(13).required().pattern(new RegExp('^[0-9]+$')),
  sku: Joi.string().length(8).required().pattern(new RegExp('^[0-9]+$')),
})

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const { error } = productValidator.validate(req.body, { abortEarly: false })
  if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: error.details.map((err) => err.message),
    })
  }
  next()
}
