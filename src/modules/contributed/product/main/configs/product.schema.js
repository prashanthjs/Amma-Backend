"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortId = require("shortid");
const Mongoose = require("mongoose");
exports.ProductSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        title: String,
        name: { type: String, slug: ['title', 'sku'], unique: true, slug_padding_size: 6 },
        sku: String,
        categories: [String],
        price: {
            sell: Number,
            cost: Number,
            list: Number,
        },
        shortDescription: String,
        description: String,
        inventory: {
            stock: Number,
            quantity: {
                min: Number,
                max: Number,
                step: Number
            }
        },
        shipping: {
            weight: Number,
            box: {
                length: Number,
                width: Number,
                height: Number
            }
        },
        imgToken: String,
        isActive: {
            type: Boolean,
            'default': true
        },
        tags: [String],
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
//# sourceMappingURL=product.schema.js.map