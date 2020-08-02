const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.post('/add', authenticateToken, logger,  (req, res)=>{ // adds new order.

    const newOrder = new Order({
        amount: req.body.amount,
        currency: req.body.currency,
        addedby: req.user
    })

    newOrder.save()
    .then(order=>{res.status(201).send("Order added")})
    .catch(err=>console.log(err))
})

module.exports = router;