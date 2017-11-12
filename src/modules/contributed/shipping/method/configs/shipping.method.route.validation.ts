import * as Joi from 'joi';

export const Payload = {
    title: Joi.string().required(),
    isActive: Joi.boolean(),
    deliveryTime: Joi.string(),
    weight: Joi.object().keys({
        min: Joi.number().required(),
        max: Joi.number().required()
    }),
    shippingCharge: Joi.object().keys({
        totalPrice: Joi.array().items(Joi.object().keys({
            min: Joi.number().required(),
            amount: Joi.number(),
            type: Joi.any().tags(['percentage', 'absolute']).required(),
        })),
        totalWeight: Joi.array().items(Joi.object().keys({
            min: Joi.number().required(),
            amount: Joi.number(),
            type: Joi.any().tags(['percentage', 'absolute']).required(),
        })),
        totalItem: Joi.array().items(Joi.object().keys({
            min: Joi.number().required(),
            amount: Joi.number(),
            type: Joi.any().tags(['percentage', 'absolute']).required(),
        })),
    }),
    extraPublic: Joi.object().allow(['', null]),
};