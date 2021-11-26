import Joi from "joi";

const paperSchema = {
  body: Joi.object({
    title: Joi.string().max(25).required(),
    subtitle: Joi.string().max(25).required(),
    year: Joi.number().required(),
    published: Joi.boolean(),
    type: Joi.string().max(25).required(),
    location: Joi.string().max(25).required(),
    photograph: Joi.string().max(25),
    text: Joi.string().min(50).max(2000).required(),
    images: Joi.array(),
    deleted: Joi.boolean(),
  }),
};

export default paperSchema;
