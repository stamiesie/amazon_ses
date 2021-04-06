const { Router } = require('express');
const Order = require('../models/Order');

module.exports = Router()
.post('/', (req, res, next) => {
    Order
    .create(req.body)
    .then(orders => res.send(orders))
    .catch(next);
});