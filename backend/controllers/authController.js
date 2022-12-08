const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body //required login content

    if (!username || !password) { //if login content missing
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username }).exec() //finds user in db

    if (!foundUser ) {
        return res.status(401).json({ message: 'Unauthorized user' }) //doesnt find user in db
    }

    const match = await bcrypt.compare(password, foundUser.password) //password matched database password 

    if (!match) return res.status(401).json({ message: 'Unauthorized password' }) //password not a match

    //create login access token (jwt)
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": foundUser.username
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' } //access token expires in 15 minutes
    )
    //create refresh token for expired access tokens
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' } //refresh token expires in 24 hours
    )

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry
    })

    // Send accessToken 
    res.json({ accessToken })
})

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
    const cookies = req.cookies 
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized no cookie' }) //no cookies
    //set refreshToken
    const refreshToken = cookies.jwt
    //verify jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET, //from .env file
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            //user exists
            const foundUser = await User.findOne({ username: decoded.username }).exec()
            //no user found
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized founduser' })
            
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
            console.log('refresh token provided')
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
    console.log('cookie cleared')
}

module.exports = {
    login,
    refresh,
    logout
}