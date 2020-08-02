const mongoose = require("mongoose")

const userShema = new mongoose.Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

const Users = mongoose.model("users", userShema)

module.exports = Users