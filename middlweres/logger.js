const Logger = require("../models/Logger") 

const logger = function (req, res, next) {

    let user = ("user" in req) ? req.user.username : "anonymous" 

    const newLog = new Logger({
        route: req.url,
        user: user
    })

    newLog.save()
    .then(log=>{console.log("Endpoint hit logged");})
    .catch(err=>console.log(err))

    next()
}

module.exports = logger