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

module.exports = router;