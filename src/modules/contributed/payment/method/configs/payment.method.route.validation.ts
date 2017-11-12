import * as Joi from 'joi';

export const Payload = {
    title: Joi.string().required(),
    isActive: Joi.boolean(),
    surcharge: Joi.object().keys({
        amount: Joi.number().required(),
        type: Joi.any().tags(['percentage', 'absolute']).required(),
    }).required(),
    extraPublic: Joi.object().allow(['', null]),
};