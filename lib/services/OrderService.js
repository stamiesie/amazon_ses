const Order = require('../models/Order');
const { sendEmail } = require('../utils/aws-ses')

module.exports = class OrderService {
    static async create({ email, quantity}) {
        await sendEmail(`Thank you ${email} for your order of ${quantity} kittens.`
        );

        const newOrder = await Order.create({ email, quantity});

        return newOrder;
    }

    static async updateOrderById({ quantity }, id, email) {
        await sendEmail(`Hello ${email}! Your order has been updated to ${quantity} kittens.`)

        const updatedOrder = await Order.updateOrderById({ quantity }, id, email);

        return updatedOrder;
    }

    static async deleteOrderById({ id }, email) {
        await sendEmail(`Hello ${email}! Your order has been deleted.`)

        const deleteOrder = await Order.deleteOrderById({ id });

        return deleteOrder;
    }
};