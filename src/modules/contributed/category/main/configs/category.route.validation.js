"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    parent: Joi.string().allow(['', null]),
    description: Joi.string().allow(['', null]),
    imgToken: Joi.string().required(),
    isActive: Joi.boolean(),
    extraPublic: Joi.object().allow(['', null]),
};
//# sourceMappingURL=category.route.validation.js.map