import * as ShortId from 'shortid';
import * as Mongoose from 'mongoose';

export const CategorySchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        title: String,
        name: {type: String, slug: 'title', unique: true, slug_padding_size: 4},
        parent: String,
        description: String,
        imgToken: String,
        isActive: {
            type: Boolean,
            'default': true
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
    }
};