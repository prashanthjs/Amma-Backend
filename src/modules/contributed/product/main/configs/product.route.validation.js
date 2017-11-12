"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    title: Joi.string().required(),
    sku: Joi.string().required(),
    categories: Joi.array().items(Joi.string()).allow(['', null]),
    price: Joi.object().keys({
        sell: Joi.number().required(),
        cost: Joi.number().required(),
        list: Joi.number().required()
    }),
    shortDescription: Joi.string().allow(['', null]),
    description: Joi.string().allow(['', null]),
    imgToken: Joi.string().required(),
    inventory: Joi.object().keys({
        stock: Joi.number().required(),
        quantity: Joi.object().keys({
            min: Joi.number().required(),
            max: Joi.number().required(),
            step: Joi.number().required()
        })
    }),
    shipping: Joi.object().keys({
        weight: Joi.number().required(),
        box: Joi.object().keys({
            length: Joi.number().required(),
            width: Joi.number().required(),
            height: Joi.number().required()
        })
    }),
    tags: Joi.array().items(Joi.string()),
    isActive: Joi.boolean().required(),
};
//# sourceMappingURL=product.route.validation.js.map