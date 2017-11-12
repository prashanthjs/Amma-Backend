import * as Joi from 'joi';

export const CreatePayload = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().allow(['', null]),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    dob: Joi.date().allow(['', null]),
    gender: Joi.any().tags(['male', 'female', 'other']),
    isActive: Joi.boolean(),
    address: Joi.object().keys({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().allow(['', null]),
        town: Joi.string().required(),
        county: Joi.string().allow(['', null]),
        country: Joi.string().required(),
        postcode: Joi.string().required()
    }),
    imgToken: Joi.string().required(),
    extraPublic: Joi.object()
};

export const UpdatePayload = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    middleName: Joi.string().allow(['', null]),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().required(),
    dob: Joi.date().allow(['', null]),
    gender: Joi.any().tags(['male', 'female', 'other']),
    isActive: Joi.boolean(),
    address: Joi.object().keys({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().allow(['', null]),
        town: Joi.string().required(),
        county: Joi.string().allow(['', null]),
        country: Joi.string().required(),
        postcode: Joi.string().required()
    }),
    imgToken: Joi.string().required(),
    extraPublic: Joi.object().allow(['', null]),
};

export const ChangePasswordPayload = {
    password: Joi.string().required()
};

export const UserLoginPayload = {
    username: Joi.string().required(),
    password: Joi.string().required()
};