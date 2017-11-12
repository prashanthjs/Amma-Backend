"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortId = require("shortid");
const Mongoose = require("mongoose");
exports.UserGroupSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        name: { type: String, slug: ['title'], unique: true, slug_padding_size: 4 },
        title: String,
        description: String,
        isActive: {
            type: Boolean,
            'default': true
        },
        isLocked: {
            type: Boolean,
            'default': false
        },
        privileges: [String],
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
//# sourceMappingURL=user.group.schema.js.map