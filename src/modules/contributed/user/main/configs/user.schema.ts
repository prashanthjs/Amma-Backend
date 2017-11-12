import * as ShortId from 'shortid';
import * as Mongoose from 'mongoose';

export const UserSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        username: {type: String, slug: ['firstName', 'lastName'], unique: true, slug_padding_size: 4},
        firstName: String,
        middleName: String,
        lastName: String,
        password: {
            type: String,
            select: false
        },
        email: {
            type: String,
            unique: true
        },
        contactNumber: String,
        dob: Date,
        gender: String,
        isLocked: {
            type: Boolean,
            'default': false
        },
        isActive: {
            type: Boolean,
            'default': true,
        },
        imgToken: String,
        address: {
            addressLine1: String,
            addressLine2: String,
            town: String,
            county: String,
            country: String,
            postcode: String
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