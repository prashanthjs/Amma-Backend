import * as Joi from 'joi';

export const Payload = {
    title: Joi.string().required(),
    frontendStatus: Joi.string().required(),
    type: Joi.string().valid(['open', 'processing', 'completed', 'declined']).required(),
    extraPublic: Joi.object().allow(['', null]),
};