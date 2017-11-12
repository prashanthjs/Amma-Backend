import * as ShortId from 'shortid';
import * as MongooseValidator from 'mongoose-validator';
import * as Mongoose from 'mongoose';

export const MartSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        title: String,
        name: {type: String, slug: 'title', unique: true, slug_padding_size: 4},
        email: {
            type: String,
            require: true,
            unique: true,
            validate: MongooseValidator({
                validator: 'isEmail',
                passIfEmpty: true,
                message: 'Not a valid email'
            })
        },
        website: String,
        contactNumber: String,
        address: {
            addressLine1: String,
            addressLine2: String,
            town: String,
            county: String,
            country: String,
            postcode: String
        },
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
    },
};