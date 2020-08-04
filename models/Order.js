const mongoose = require("mongoose")

const orderShema = new mongoose.Schema({

    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    addedby: {
        type: {},
        required: true
    },
    orderNr: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const Order = mongoose.model("order", orderShema)

module.exports = Order