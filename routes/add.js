const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.post('/add', authenticateToken, logger,  (req, res)=>{ // adds new order.

    if(!req.body.amount) return  res.status(201).send("Amount field is empy")
    if(!req.body.currency) return res.status(201).send("Currency field is empty")
    if(isNaN(req.body.currency && req.body.currency != true && req.body.currency != null)) return res.status(201).send("Currency must ne number")

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