import Joi from "joi";

export const registerValidation=Joi.object({
    name:Joi.string(),
    email:Joi.string()
    .email()
    .required()
    .messages({
        'string.email':'Please enter a valid email address.',
        'string.empty':'Email is required.'
    }),
    password:Joi.string()
    .min(6)
    .required()
    .messages({
        'string.min':'Password must be at least contain 6 characters.',
        'string.empty':'Password is required.'
    }),
   
});


export const loginValidation=Joi.object({
    email:Joi.string()
    .required()
    .email()
    .message({
        'string.email':'Please Enter a valid email address.',
        'string.empty':'Email is required.'
    }),
    password:Joi.string()
    .required()
    .messages({
        'string.empty':'Password is required.'
    }),
});

