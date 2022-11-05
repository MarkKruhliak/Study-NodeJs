const Joi = require('joi')

const {EMAIL, PASSWORD} = require('../constans/regex.enum')
const {IDValidator} = require("./common.validators");

const newUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(35).required(),
    age: Joi.number().integer().min(1).max(120),
    email: Joi.string().regex(EMAIL).required().error(new Error("Email not valid")),
    password: Joi.string().regex(PASSWORD).required().error(new Error("Password not valid")),
    cars: Joi.array().items(IDValidator)
})

const passwordValidator = Joi.string().regex(PASSWORD)
    .required()
    .error(new Error('Password not valid'));

const userPasswordValidator = Joi.object({
    password: passwordValidator.required().error(new Error('Wrong password')),
});

module.exports = {
    newUserValidator,
    userPasswordValidator
}
