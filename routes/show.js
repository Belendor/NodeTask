const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.get('/show', authenticateToken, logger, async (req, res)=>{

    const page = parseInt(req.query.page) 
    const limit = parseInt(req.query.limit)

    if(page && limit){
        const allOrders = await Order.find({});

        const startIndex  = (page - 1) * limit
        const endIndex  = page * limit
        
        const results = {}
        results.results = allOrders.slice(startIndex, endIndex)

        let totalRecords = allOrders.length

        if(endIndex < totalRecords){
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0){
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        res.json(results) 
    }else{
        const allOrder = await Order.find({});
        res.json(allOrder)
    }
})

router.get('/show/:id', authenticateToken, logger, async (req, res)=>{

    const order = await Order.find({orderNr: req.params.id})

    if(order){
        res.json(order)
    }else{
        res.status(400).send(`there is no order with ID: ${req.params.id}`)
    }

})

module.exports = router;