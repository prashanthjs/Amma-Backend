"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    email: Joi.string().email().required(),
    contactNumber: Joi.string().allow(['', null]),
    website: Joi.string().uri().allow(['', null]),
    address: Joi.object().keys({
        addressLine1: Joi.string().required(),
        addressLine2: Joi.string().allow([null, '']),
        town: Joi.string().required(),
        county: Joi.string().allow([null, '']),
        country: Joi.string().required(),
        postcode: Joi.string().required()
    }),
    description: Joi.string().allow(['', null]),
    imgToken: Joi.string().required(),
    isActive: Joi.boolean(),
    extraPublic: Joi.object().allow(['', null]),
};
//# sourceMappingURL=mart.route.validation.js.map