const express = require("express");
const router = express.Router();
const Logger = require("../models/Logger")
const logger = require("../middlweres/logger.js")
const authenticateToken = require("../middlweres/authenticateToken.js")

router.get('/logs', authenticateToken, logger, async (req, res)=>{ 

    const allLogs = await Logger.find({});
    let reveredLogs = []
    for(let i = allLogs.length-1; i >= 0; i--){
        reveredLogs.push(allLogs[i]) 
    }

    res.status(200).send(reveredLogs)
})

module.exports = router;