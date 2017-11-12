"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    frontendStatus: Joi.string().required(),
    type: Joi.string().valid(['open', 'processing', 'completed', 'declined']).required(),
    extraPublic: Joi.object().allow(['', null]),
};
//# sourceMappingURL=order.status.route.validation.js.map