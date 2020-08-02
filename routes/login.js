const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/User")
const logger = require("../middlweres/logger.js")

router.post('/login', logger, async (req, res)=>{
    User.findOne({username: req.body.username}) // Checking for user in DB.
    .then(async user =>{
                    if(!user){
                        res.status(200).send("No such user found")
                    }

                    const passwordValid = await bcrypt.compare(req.body.password, user.password) // Checking users password

                    if (!passwordValid) {
                        res.status(200).send("Wrong password")
                    }else{

                        const payloadUser = {
                            username: user.username
                        }

                        const accessToken =  jwt.sign(payloadUser, process.env.ACCESS_TOKEN_SECRET) // , {expiresIn: '60s'}

                        const refreshToken = jwt.sign(payloadUser, process.env.REFRESH_TOKEN_SECRET)

                        // refreshTokens.push(refreshToken) // Reikia prideti refresh tokenus i duomenu baze
                    
                        res.json({ accessToken: accessToken, refreshToken: refreshToken})

                    }
                })
    .catch(err=>console.log(err))

    const username = req.body.username

    const user = {
        username: username
    }
})

module.exports = router;