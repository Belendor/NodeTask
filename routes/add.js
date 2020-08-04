const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.post('/add', authenticateToken, logger, async (req, res)=>{ // adds new order.

    try{

        if(!req.body.amount) return  res.status(201).send("Amount field is empy")
        if(!req.body.currency) return res.status(201).send("Currency field is empty")
        if(isNaN(req.body.currency && req.body.currency != true && req.body.currency != null)) return res.status(201).send("Currency must ne number")
        
        var totalOrders = 1
        await Order.estimatedDocumentCount((err, count) => {
            if(count){
                totalOrders = count+1
                console.log("order id added:", totalOrders);
            if(err){
               console.log(err);
            }
        }})
        if(totalOrders == 1){
            return res.status(500).send("Error on server side. Please try again")
        }
        
        const newOrder = new Order({
            amount: req.body.amount, 
            currency: req.body.currency,
            addedby: req.user,
            orderNr: totalOrders
        })

        newOrder.save()
        .then(order=>{res.status(201).send("Order added")})
        .catch(err=>console.log(err))
            
    }catch(e){
        console.log(e);
        res.status(400).send("Request could not be processed")
    }
})

module.exports = router;