const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
.post('/', (req, res, next) => {
    OrderService
    .create(req.body)
    .then(orders => res.send(orders))
    .catch(next);
})

.get('/', (req, res, next) => {
    Order
    .findAllOrders()
    .then(orders => res.send(orders))
    .catch(next);
})

.get('/:id', (req, res, next) => {
    Order
    .getOrderById(req.params.id)
    .then(orders => res.send(orders))
    .catch(next);
})