const express = require("express");
const router = express.Router();
const Order = require("../models/Order")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.delete('/delete/:id', authenticateToken, logger, (req, res)=>{

    try{
        Order.deleteOne({orderNr: req.params.id}, function (err) {
            if (err) return res.status(400).send(`Could not delete order with ID: ${req.params.id}`)
            return res.send("Order deleted succesfuly")
          });

    }catch(e){
        res.sendStatus(500)
    }
})

module.exports = router;