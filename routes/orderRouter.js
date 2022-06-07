const express = require('express');
const Order = require('../models/orders');

const orderRouter = express.Router();

orderRouter.route('/')
.post((req, res, next) => {
    Order.create(req.body)
    .then(order => {
        console.log('Order Created', order)
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    })
})

orderRouter.route('/:orderId')
.delete((req, res, next) => {
    Order.findByIdAndDelete(req.params.orderId)
    .then(order => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(order)
    })
})
module.exports = orderRouter;