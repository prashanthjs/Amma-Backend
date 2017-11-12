"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    isActive: Joi.boolean(),
    surcharge: Joi.object().keys({
        amount: Joi.number().required(),
        type: Joi.any().tags(['percentage', 'absolute']).required(),
    }).required(),
    extraPublic: Joi.object().allow(['', null]),
};
//# sourceMappingURL=payment.method.route.validation.js.map