const Order = require('../models/Order');
const { sendEmail } = require('../utils/aws-ses')

module.exports = class OrderService {
    static async create({ email, quantity}) {
        await sendEmail(`Thank you ${email} for your order of ${quantity} kittens.`
        );

        const newOrder = await Order.create({ email, quantity});

        return newOrder;
    }


};