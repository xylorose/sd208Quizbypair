const Joi = require("joi");

const MovieSchema = Joi.object({
  title: Joi.string().required().min(4).max(10),
  genre: Joi.string().required().min(4).max(8),
  director: Joi.string().required().min(3).max(20),
});

module.exports = MovieSchema;
