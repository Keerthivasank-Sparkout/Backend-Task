const Joi = require('joi');
const AppError = require('../utils/appError');

class TourValidator {
    constructor() {
        const pointSchema = Joi.object({
            type: Joi.string().valid('Point').default('Point'),
            coordinates: Joi.array().items(Joi.number()).length(2).required(),
            address: Joi.string().trim().required(),
            description: Joi.string().trim().required()
        });

        const locationSchema = Joi.object({
            type: Joi.string().valid('Point').default('Point'),
            coordinates: Joi.array().items(Joi.number()).length(2).required(),
            address: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            day: Joi.number().integer().min(1).required()
        });

        const baseSchema = {
            name: Joi.string().trim().min(3).max(100),
            duration: Joi.number().positive(),
            maxGroupSize: Joi.number().integer().positive(),
            difficulty: Joi.string().trim().valid('easy', 'medium', 'difficult'),
            ratingsAverage: Joi.number().min(0).max(5),
            ratingsQuntity: Joi.number().integer().min(0),
            price: Joi.number().positive(),
            priceDiscount: Joi.number().min(0),
            summary: Joi.string().trim(),
            description: Joi.string().trim(),
            imageCover: Joi.string().trim(),
            images: Joi.array().items(Joi.string().trim()),
            startDates: Joi.array().items(Joi.date()),
            startLocation: pointSchema,
            locations: Joi.array().items(locationSchema),
            guides: Joi.array().items(Joi.string().trim().hex().length(24))
        };

        this.schemas = {
            createTour: Joi.object({
                ...baseSchema,
                name: baseSchema.name.required(),
                duration: baseSchema.duration.required(),
                maxGroupSize: baseSchema.maxGroupSize.required(),
                difficulty: baseSchema.difficulty.required(),
                ratingsAverage: baseSchema.ratingsAverage.required(),
                price: baseSchema.price.required(),
                imageCover: baseSchema.imageCover.required()
            }).custom((value, helpers) => {
                if (value.priceDiscount !== undefined && value.price !== undefined && value.priceDiscount >= value.price) {
                    return helpers.error('any.invalid');
                }
                return value;
            }).messages({
                'any.invalid': 'priceDiscount must be less than price'
            }),

            updateTour: Joi.object(baseSchema).min(1).custom((value, helpers) => {
                if (value.priceDiscount !== undefined && value.price !== undefined && value.priceDiscount >= value.price) {
                    return helpers.error('any.invalid');
                }
                return value;
            }).messages({
                'any.invalid': 'priceDiscount must be less than price'
            })
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

module.exports = new TourValidator();
