import Joi from "joi";

const paperSchema = {
  body: Joi.object({
    title: Joi.string().max(25).required(),
    author: Joi.string().max(25),
    year: Joi.number().required(),
    published: Joi.boolean(),
    type: Joi.string().max(25).required(),
    location: Joi.string().max(25).required(),
    photograph: Joi.string().max(25),
    text: Joi.string().max(2000).required(),
    images: Joi.array(),
    deleted: Joi.boolean(),
  }),
};

export default paperSchema;
