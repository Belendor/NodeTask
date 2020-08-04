const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.put('/update/:id', authenticateToken, logger, async (req, res)=>{ // adds new order.

    if(!req.body.amount) return  res.status(201).send("Amount field is empy")
    if(!req.body.currency) return res.status(201).send("Currency field is empty")
    if(isNaN(req.body.currency && req.body.currency != true && req.body.currency != null)) return res.status(201).send("Currency must ne number")

    try{
       let order = await Order.findOne({orderNr: req.params.id}).exec();
        if(order){
            order.amount = req.body.amount
            order.currency = req.body.currency
            order.save()

            return res.send(`Order updated succesfuly`)
        }
            
    }catch(e){
        console.log(e);
        res.status(400).send("Request could not be processed")
    }
})

module.exports = router;