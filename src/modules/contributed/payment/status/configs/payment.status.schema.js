"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortId = require("shortid");
const Mongoose = require("mongoose");
exports.PaymentStatusSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        name: { type: String, slug: ['title'], unique: true, slug_padding_size: 4 },
        title: String,
        frontendStatus: String,
        type: String,
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
    }
};
//# sourceMappingURL=payment.status.schema.js.map