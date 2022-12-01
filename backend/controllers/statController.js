//imports
const User = require('../models/User')
const Song = require('../models/Song')
const Stat = require('../models/Stat')
const asyncHandler = require('express-async-handler') 

//get all stats for specific user
const getStats = asyncHandler(async (req, res) => {
    //required items in request
    const username = req.query.username;
    console.log("params" +username)
    // Confirm data exists in request
    if (!username) {
        return res.status(400).json({ message: 'Required Data Missing' }) //bad request
    }

    // Does the user exist to find stats
    const user = await User.find({username: username}).exec()
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' }) //bad request, no user found by that ysername
    }
   
    try {
        const stats = await Stat.find({user: user}).populate('song').populate('user')
        res.json(stats);
    } catch (error) {
        res.status(500).json({message: error.message}); //no stat exists
    }
})


//get stats for specific user and song
const getSongStats = asyncHandler(async (req, res) => {
    //required items in request
    const { username, songName } = req.body
    // Confirm data exists in request
    if (!username || !songName) {
        return res.status(400).json({ message: 'Required Data Missing' }) //bad request
    }

    // Does the user exist to find stats
    const user = await User.find({username: username}).exec()
    
    if (!user) {
        return res.status(400).json({ message: 'User not found' }) //bad request, no user found by that ysername
    }
    //does the song exist to find stats
    const song = await Song.find({title: songName}).lean().exec()
    if (!song) {
        return res.status(400).json({ message: 'Song not found' }) //bad request, song not found
    }
    try {
        const stats = await Stat.find({user: user, song:song}).populate('song').populate('user')
        res.json(stats);
    } catch (error) {
        res.status(500).json({message: error.message}); //no stat exists
    }
})

const postStats = asyncHandler(async (req, res) => {
    const { username, songName, score, accuracy, highCombo } = req.body
    // Confirm data
    if (!username || !songName || !score || !accuracy || !highCombo ) {
        return res.status(400).json({ message: 'All data not present' })
    }
    const user = await User.findOne({ username }).lean().exec()
    if (!user) {
        return res.status(409).json({ message: 'User not found' }) //user not found
    }

    const song = await Song.findOne({title: songName}).lean().exec()
    if (!song) {
        return res.status(400).json({ message: 'Song not found' }) //bad request, song not found
    }

    const userObject = { user, song, score, accuracy, highCombo }

    // Create and store new user 
    const stat = await Stat.create(userObject)

    if (stat) { //created 
        res.status(201).json({ message: `New stat for ${username} and ${songName} created` })
    } else {
        res.status(400).json({ message: 'Invalid stat data received' })
    }
})





module.exports = {
    getStats,
    getSongStats,
    postStats
}