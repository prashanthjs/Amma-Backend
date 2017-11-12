import * as Joi from 'joi';

export const Payload = {
    title: Joi.string().required(),
    description: Joi.string().allow(['', null]),
    isActive: Joi.boolean(),
    privileges: Joi.array().items(Joi.string()),
    extraPublic: Joi.object()
};