import * as Joi from 'joi';

export const Payload = {
    title: Joi.string().required(),
    parent: Joi.string().allow(['', null]),
    description: Joi.string().allow(['', null]),
    imgToken: Joi.string().required(),
    isActive: Joi.boolean(),
    extraPublic: Joi.object().allow(['', null]),
};