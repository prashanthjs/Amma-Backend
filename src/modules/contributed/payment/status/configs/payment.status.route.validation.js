"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    frontendStatus: Joi.string().required(),
    type: Joi.any().tags(['open', 'processing', 'successful', 'declined']),
    extraPublic: Joi.object().allow(['', null]),
};
//# sourceMappingURL=payment.status.route.validation.js.map