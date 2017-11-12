"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OrderTransformerHandler {
    constructor(server) {
        this.server = server;
        server.method('orderTotalsTransformerHandler', (request, reply) => this.orderTotalsTransformer(request, reply));
    }
    orderTotalsTransformer(request, reply) {
        this.calculateTotal(request.payload);
        reply();
    }
    calculateTotal(payload) {
        const totalPrice = { sell: 0, list: 0, cost: 0 };
        const totalShipping = { weight: 0 };
        if (payload.inItems && payload.inItems.length) {
            payload.inItems.forEach((item, index) => {
                this.calculateItemTotal(item);
                totalPrice.sell += item.totalPrice.sell;
                totalPrice.cost += item.totalPrice.cost;
                totalPrice.list += item.totalPrice.list;
                totalShipping.weight += item.totalShipping.weight;
            });
        }
        if (payload.outItems && payload.outItems.length) {
            payload.outItems.forEach((outItem) => {
                totalPrice.sell += outItem.price.sell;
                totalPrice.cost += outItem.price.cost;
                totalPrice.list += outItem.price.list;
            });
        }
        payload.totalPrice = totalPrice;
        payload.totalShipping = totalShipping;
    }
    calculateItemTotal(item) {
        const totalItemPrice = { sell: item.price.sell, list: item.price.list, cost: item.price.cost };
        const totalItemShipping = { weight: item.shipping.weight };
        if (item.inItems && item.inItems.length) {
            item.inItems.forEach((inItem) => {
                totalItemPrice.sell += inItem.price.sell;
                totalItemPrice.cost += inItem.price.cost;
                totalItemPrice.list += inItem.price.list;
            });
        }
        totalItemPrice.sell *= item.qty;
        totalItemPrice.cost *= item.qty;
        totalItemPrice.list *= item.qty;
        totalItemShipping.weight *= item.qty;
        if (item.outItems && item.outItems.length) {
            item.outItems.forEach((outItem) => {
                totalItemPrice.sell += outItem.price.sell;
                totalItemPrice.cost += outItem.price.cost;
                totalItemPrice.list += outItem.price.list;
            });
        }
        item.totalPrice = totalItemPrice;
        item.totalShipping = totalItemShipping;
    }
}
exports.OrderTransformerHandler = OrderTransformerHandler;
//# sourceMappingURL=order.transformer.handler.js.map