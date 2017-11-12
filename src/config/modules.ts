export const modules = {
    database: __dirname + '/../modules/core/database',
    queryParser: __dirname + '/../modules/core/query-parser',
    rest: __dirname + '/../modules/core/rest',

    privilege: __dirname + '/../modules/contributed/privilege',

    file: __dirname + '/../modules/contributed/file/main',

    mart: __dirname + '/../modules/contributed/mart/main',
    group: __dirname + '/../modules/contributed/user/group',

    user: __dirname + '/../modules/contributed/user/main',
    userGroup: __dirname + '/../modules/contributed/user/usergroup',
    userMart: __dirname + '/../modules/contributed/user/mart',

    category: __dirname + '/../modules/contributed/category/main',
    categoryMart: __dirname + '/../modules/contributed/category/mart',

    product: __dirname + '/../modules/contributed/product/main',
    productMart: __dirname + '/../modules/contributed/product/mart',

    paymentMethod: __dirname + '/../modules/contributed/payment/method',
    paymentStatus: __dirname + '/../modules/contributed/payment/status',
    shippingMethod: __dirname + '/../modules/contributed/shipping/method',
    shippingStatus: __dirname + '/../modules/contributed/shipping/status',

    orderStatus: __dirname + '/../modules/contributed/order/status',
    order: __dirname + '/../modules/contributed/order/main',
    orderMart: __dirname + '/../modules/contributed/order/mart',

    reportOrder: __dirname + '/../modules/contributed/report/order',
    reportUser: __dirname + '/../modules/contributed/report/user',
    reportMart: __dirname + '/../modules/contributed/report/mart',
};