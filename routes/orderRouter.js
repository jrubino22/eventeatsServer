const express = require('express');
const orderRouter = express.Router();

orderRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the orders to you');
})
.post((req, res) => {
    res.end(`Will add the order: ${req.body.dish} with option: ${req.body.option1}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /orderForm');
})
.delete((req, res) => {
    res.end('Deleting all orders');
});

module.exports = campsiteRouter;