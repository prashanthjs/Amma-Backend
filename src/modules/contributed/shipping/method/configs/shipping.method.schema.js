"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortId = require("shortid");
const Mongoose = require("mongoose");
exports.ShippingMethodSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        name: { type: String, slug: ['title'], unique: true, slug_padding_size: 4 },
        title: String,
        isActive: {
            type: Boolean,
            'default': true
        },
        deliveryTime: String,
        weight: {
            min: String,
            max: String
        },
        shippingCharge: {
            totalPrice: [{
                    _id: false,
                    min: Number,
                    amount: Number,
                    type: {
                        type: String
                    }
                }],
            totalWeight: [{
                    _id: false,
                    min: Number,
                    amount: Number,
                    type: {
                        type: String
                    }
                }],
            totalItem: [{
                    _id: false,
                    min: Number,
                    amount: Number,
                    type: {
                        type: String
                    }
                }],
        },
        isLocked: {
            type: Boolean,
            'default': false
        },
        extraPublic: Mongoose.Schema.Types.Mixed,
        extraPrivate: {
            type: Mongoose.Schema.Types.Mixed,
            require: false,
            select: false
        },
        extraTemp: {
            type: Mongoose.Schema.Types.Mixed,
            require: false,
            select: false
        }
    },
};
//# sourceMappingURL=shipping.method.schema.js.map