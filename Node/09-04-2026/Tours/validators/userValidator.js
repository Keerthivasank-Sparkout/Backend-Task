const Joi = require('joi');
const AppError = require('../utils/appError');

class UserValidator {
    constructor() {
        const password = Joi.string().trim().min(8).max(15);
        const email = Joi.string().trim().lowercase().email();
        const role = Joi.string().valid('user', 'guide', 'lead-guide', 'admin');

        this.schemas = {
            signup: Joi.object({
                name: Joi.string().trim().min(2).max(30).required(),
                email: email.required(),
                role: role.default('user'),
                password: password.required(),
                confirmPass: Joi.string().trim().required().valid(Joi.ref('password'))
                    .messages({
                        'any.only': 'confirmPass must match password'
                    })
            }),

            login: Joi.object({
                email: email.required(),
                password: password.required()
            }),

            forgotPassword: Joi.object({
                email: email.required()
            }),

            verifyOtp: Joi.object({
                email: email.required(),
                otp: Joi.number().integer().min(100000).max(999999).required()
            }),

            resetPassword: Joi.object({
                email: email.required(),
                password: password.required(),
                confirmPassword: Joi.string().trim().required().valid(Joi.ref('password'))
                    .messages({
                        'any.only': 'confirmPassword must match password'
                    })
            }),

            changePassword: Joi.object({
                old_password: password.required(),
                new_password: password.required(),
                confirmPassword: Joi.string().trim().required().valid(Joi.ref('new_password'))
                    .messages({
                        'any.only': 'confirmPassword must match new_password'
                    })
            }),

            createUser: Joi.object({
                name: Joi.string().trim().min(2).max(30).required(),
                email: email.required(),
                photo: Joi.string().trim(),
                role: role.default('user'),
                password: password.required(),
                confirmPass: Joi.string().trim().required().valid(Joi.ref('password'))
                    .messages({
                        'any.only': 'confirmPass must match password'
                    })
            }),

            updateUser: Joi.object({
                name: Joi.string().trim().min(2).max(30),
                email: email,
                photo: Joi.string().trim(),
                role: role
            }).min(1)
        };
    }

    validate(schemaName) {
        return (req, res, next) => {
            const schema = this.schemas[schemaName];

            if (!schema) {
                return next(new AppError(`Validation schema '${schemaName}' not found`, 500));
            }

            const { error, value } = schema.validate(req.body, {
                abortEarly: false,
                allowUnknown: false,
                stripUnknown: true
            });

            if (error) {
                const message = error.details.map((detail) => detail.message).join(', ');
                return next(new AppError(message, 400));
            }

            req.body = value;
            next();
        };
    }
}

module.exports = new UserValidator();
