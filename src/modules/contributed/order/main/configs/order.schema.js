"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShortId = require("shortid");
const Mongoose = require("mongoose");
exports.OrderSchema = {
    schema: {
        _id: {
            type: String,
            'default': ShortId.generate
        },
        user: {
            firstName: String,
            middleName: String,
            lastName: String,
            email: String,
            contactNumber: String,
            username: String
        },
        orderStatus: String,
        address: {
            billing: {
                addressLine1: String,
                addressLine2: String,
                town: String,
                county: String,
                country: String,
                postcode: String
            },
            shipping: {
                addressLine1: String,
                addressLine2: String,
                town: String,
                county: String,
                country: String,
                postcode: String
            }
        },
        inItems: [{
                _id: false,
                name: String,
                title: String,
                price: {
                    sell: Number,
                    cost: Number,
                    list: Number,
                },
                qty: Number,
                shipping: {
                    weight: Number,
                    box: {
                        length: Number,
                        width: Number,
                        height: Number
                    }
                },
                inItems: [{
                        _id: false,
                        name: String,
                        title: String,
                        price: {
                            sell: Number,
                            cost: Number,
                            list: Number,
                        },
                    }],
                outItems: [{
                        _id: false,
                        name: String,
                        title: String,
                        price: {
                            sell: Number,
                            cost: Number,
                            list: Number,
                        },
                    }],
                totalPrice: {
                    sell: Number,
                    cost: Number,
                    list: Number,
                },
                totalShipping: {
                    weight: Number
                },
            }],
        outItems: [{
                _id: false,
                name: String,
                title: String,
                price: {
                    sell: Number,
                    cost: Number,
                    list: Number,
                },
            }],
        totalPrice: {
            sell: Number,
            cost: Number,
            list: Number,
        },
        totalShipping: {
            weight: Number
        },
        referenceNumber: String,
        notes: {
            customer: String,
            staff: String
        },
        payment: [{
                _id: false,
                name: String,
                reference: String,
                amount: Number,
                notes: {
                    customer: String,
                    staff: String
                },
                createdAt: {
                    type: Date,
                    'default': Date.now
                },
                paymentStatus: String,
            }],
        shipping: [{
                _id: false,
                name: String,
                trackingNumber: String,
                notes: {
                    customer: String,
                    staff: String
                },
                createdAt: {
                    type: Date,
                    'default': Date.now
                },
                shippingStatus: String,
            }],
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
//# sourceMappingURL=order.schema.js.map