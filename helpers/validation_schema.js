const Joi = require('@hapi/joi');

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  name: Joi.string().min(2).required(),
  age: Joi.string(),
  city: Joi.string().min(2),
  zipCode: Joi.number().greater(999).less(100000000),
})

module.exports = { authSchema }