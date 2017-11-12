"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.CreatePayload = {
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
exports.UpdatePayload = {
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
exports.ChangePasswordPayload = {
    password: Joi.string().required()
};
exports.UserLoginPayload = {
    username: Joi.string().required(),
    password: Joi.string().required()
};
//# sourceMappingURL=user.route.validation.js.map