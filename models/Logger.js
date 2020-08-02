const mongoose = require("mongoose")


const loggerShema = new mongoose.Schema({

    route: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Logger = mongoose.model("logger", loggerShema)

module.exports = Logger