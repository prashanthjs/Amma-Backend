"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    description: Joi.string().allow(['', null]),
    isActive: Joi.boolean(),
    privileges: Joi.array().items(Joi.string()),
    extraPublic: Joi.object()
};
//# sourceMappingURL=user.group.route.validation.js.map