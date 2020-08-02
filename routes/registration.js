const express = require("express");
const router = express.Router();
const logger = require("../middlweres/logger.js")
const bcrypt = require('bcrypt')

router.post('/register', logger, async (req, res)=>{
    console.log("registration point hit...");
    try{
        let errors = []
        let username =  req.body.username
        let password1 =  req.body.password1  
        let password2 =  req.body.password2 

        console.log("input", req.body);
        console.log(username);
        if(!username || !password1 || !password2){
            errors.push("username, password1 or papassword2 Not found.")
        }
        console.log("fields checked");
        if(password2 !== password1){
            errors.push("passwords do not match")
        }
        console.log("passwords checked");
        if(password2 != null && password1.length < 6){
            errors.push("Password is less than 6 characters")
        }

        console.log("Errors:",  errors);

        if(errors.length > 0){
            res.status(400).send(errors)
        }else{
            console.log('Everything good, no errors from input.');
            User.findOne({username: username})
            .then( async user =>{
                if(user){
                    res.status(200).send("Username is already taken")
                }else{

                    const hashedPassword = await bcrypt.hash(password1, 10)
                    
                    const newUser = new User({
                        username: username,
                        password: hashedPassword
                    })

                    newUser.save()
                    .then(user=>{res.status(201).send("Registration Succesfull")})
                    .catch(err=>console.log(err))
                } 
            })
        }
    }catch{
        res.status(500).send()
    }
})

module.exports = router;