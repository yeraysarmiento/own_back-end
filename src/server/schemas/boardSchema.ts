import Joi from "Joi";

const boardSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    about: Joi.string().max(225).required(),
    email: Joi.string().email().required(),
    logo: Joi.string(),
    category: Joi.string().required(),
    social: Joi.object({
      instagram: Joi.string(),
      twitter: Joi.string(),
      facebook: Joi.string(),
    }).required(),
  }),
};

export default boardSchema;
