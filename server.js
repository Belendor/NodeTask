require('dotenv').config()
const mongoose = require("mongoose")
const express  = require('express')
const app      = express()
app.use(express.json())

// Database connection 

mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser:    true,
                useUnifiedTopology: true,})
.then(()=> console.log("Connected to MongoDB")).catch((err)=>console.log(err))

// Routes(unprotected)  

const registrationRoute = require("./routes/registration.js")
const loginRoute        = require("./routes/login.js")
app.use("/", registrationRoute)
app.use("/", loginRoute)

// Routes(protected)

const addOrder   = require("./routes/add.js")
const showOrders = require("./routes/show.js")
const logs       = require("./routes/logs.js")

app.use("/", addOrder)
app.use("/", showOrders)
app.use("/", logs)

// Server
const PORT = process.env.PORT ||  3000 
app.listen(PORT, ()=>{console.log(`server is runing on port: ${PORT}`)})