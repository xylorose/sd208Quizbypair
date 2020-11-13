const Joi = require("joi");

const BookSchema = Joi.object({
  title: Joi.string().required().min(4).max(10),
  author:Joi.string().required().min().max(20),
  genre: Joi.string().required().min(4).max(50),
  published:Joi.string().required().min().max(25),
  price: Joi.number().required().min(2).max(6),
});

module.exports = BookSchema;
