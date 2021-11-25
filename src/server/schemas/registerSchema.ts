import Joi from "joi";

const registerSchema = {
  body: Joi.object({
    username: Joi.string().alphanum().min(3).max(15).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

export default registerSchema;
