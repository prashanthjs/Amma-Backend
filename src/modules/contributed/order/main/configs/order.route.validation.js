"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = require("joi");
exports.Payload = {
    user: Joi.object().keys({
        firstName: Joi.string().required(),
        middleName: Joi.string().allow(['', null]),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        contactNumber: Joi.string().allow(['', null]),
        username: Joi.string().allow(['', null]),
    }).required(),
    orderStatus: Joi.string().required(),
    referenceNumber: Joi.string().allow(['', null]),
    address: Joi.object().keys({
        shipping: Joi.object().keys({
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string().allow(['', null]),
            town: Joi.string().required(),
            county: Joi.string().allow(['', null]),
            country: Joi.string().required(),
            postcode: Joi.string().required()
        }),
        billing: Joi.object().keys({
            addressLine1: Joi.string().required(),
            addressLine2: Joi.string().allow(['', null]),
            town: Joi.string().required(),
            county: Joi.string().allow(['', null]),
            country: Joi.string().required(),
            postcode: Joi.string().required()
        }),
    }),
    inItems: Joi.array().items(Joi.object().keys({
        name: Joi.string().allow(['', null]),
        title: Joi.string().allow(['', null]),
        price: Joi.object().keys({
            sell: Joi.number().required(),
            cost: Joi.number().allow(['', null]),
            list: Joi.number().allow(['', null]),
        }).required(),
        qty: Joi.number().required(),
        shipping: Joi.object().keys({
            weight: Joi.number().required(),
            box: Joi.object().keys({
                length: Joi.number().allow(['', null]),
                width: Joi.number().allow(['', null]),
                height: Joi.number().allow(['', null]),
            })
        }),
        inItems: Joi.array().items(Joi.object().keys({
            name: Joi.string().allow(['', null]),
            title: Joi.string().allow(['', null]),
            price: Joi.object().keys({
                sell: Joi.number().required(),
                cost: Joi.number().allow(['', null]),
                list: Joi.number().allow(['', null]),
            }).required(),
        })),
        outItems: Joi.array().items(Joi.object().keys({
            name: Joi.string().allow(['', null]),
            title: Joi.string().allow(['', null]),
            price: Joi.object().keys({
                sell: Joi.number().required(),
                cost: Joi.number().allow(['', null]),
                list: Joi.number().allow(['', null]),
            }).required(),
        }))
    })),
    outItems: Joi.array().items(Joi.object().keys({
        name: Joi.string().allow(['', null]),
        title: Joi.string().allow(['', null]),
        price: Joi.object().keys({
            sell: Joi.number().required(),
            cost: Joi.number().allow(['', null]),
            list: Joi.number().allow(['', null]),
        }).required(),
    })),
    notes: Joi.object().keys({
        customer: Joi.string().allow(['', null]),
        staff: Joi.string().allow(['', null]),
    }),
    payment: Joi.array().items(Joi.object().keys({
        name: Joi.string().allow(['', null]),
        reference: Joi.string().allow(['', null]),
        amount: Joi.number().allow(['', null]),
        notes: Joi.object().keys({
            customer: Joi.string().allow(['', null]),
            staff: Joi.string().allow(['', null]),
        }),
        createdAt: Joi.date().allow(['', null]),
        paymentStatus: Joi.string().allow(['', null]),
    })),
    shipping: Joi.array().items(Joi.object().keys({
        name: Joi.string().allow(['', null]),
        trackingNumber: Joi.string().allow(['', null]),
        notes: Joi.object().keys({
            customer: Joi.string().allow(['', null]),
            staff: Joi.string().allow(['', null]),
        }),
        createdAt: Joi.date().allow(['', null]),
        shippingStatus: Joi.string().allow(['', null]),
    })),
    extraPublic: Joi.object()
};
//# sourceMappingURL=order.route.validation.js.map