import * as Joi from 'joi';

export const Payload = {
    title: Joi.string().required(),
    frontendStatus: Joi.string().required(),
    type: Joi.any().tags(['open', 'processing', 'successful', 'declined']),
    extraPublic: Joi.object().allow(['', null]),
};