const jwt = require('jsonwebtoken')

let refreshTokens = []; // Untill moved to DB

app.post('/token', (req, res)=>{
    const refreshToken = req.body.token
    if(refreshToken == null) return res.sendStatus(401)
    if(!refreshToken.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken ({name: user.name})
        res.json({accessToken: accessToken})
    })
})

app.delete('/logout', (req, res)=>{
    refreshTokens = refreshTokens.filter(token=>{
        token != req.body.token
        res.sendStatus(204)
    })
})