const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": `missing field favorite`,
  }),
});

const Contact = model("contact", contactSchema);
module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
};
