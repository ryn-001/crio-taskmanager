const joi = require('joi');

const registerSchema = joi.object({
    fullname: joi().string().min(3).max(15).required(),
    username: joi().string().alphanum().min(3).max(15).required(),
    email: joi().string().email().required(),
    password: joi().string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')).min(6).max(50).required()
})

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')).min(6).max(50).required()
})

module.exports = {registerSchema,loginSchema};