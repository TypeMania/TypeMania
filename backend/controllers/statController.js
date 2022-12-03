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
    //fun query to populate all stats for specific username
    try {
        const stats = await Stat.find({user: user}).populate('song').populate('user') //.populate brings in data from subdocuments
        res.json(stats);
    } catch (error) {
        res.status(500).json({message: error.message}); //no stat exists
    }
})


//get stats for specific song
const getSongStats = asyncHandler(async (req, res) => {
    //required items in request
    const songName = req.query.songName;
    // Confirm data exists in request
    if (!songName) {
        return res.status(400).json({ message: 'Required Data Missing' }) //bad request
    }
    //does the song exist to find stats
    const song = await Song.find({title: songName}).lean().exec()
    if (!song) {
        return res.status(400).json({ message: 'Song not found' }) //bad request, song not found
    }
    //run query to find specific song stats in descending order
    try {
        const stats = await Stat.find({song:song}).sort([['score', -1]]).populate('song').populate('user') //.populate brings in data from subdocuments
        res.json(stats);
    } catch (error) {
        res.status(500).json({message: error.message}); //no stat exists
    }
})


//get stats for specific song and user - not currently used in app
const getSongUserStats = asyncHandler(async (req, res) => {
    //required items in request
    const username = req.query.username;
    const songName = req.query.songName;
    console.log("params" +username+songName)
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
    //run query to return stats for speicifc song and user
    try {
        const stats = await Stat.find({user: user, song:song}).populate('song').populate('user') //.populate brings in data from subdocuments
        res.json(stats);
    } catch (error) {
        res.status(500).json({message: error.message}); //no stat exists
    }
})


//post stats for user
const postStats = asyncHandler(async (req, res) => {
    const { username, songName, score, accuracy, highCombo } = req.body
    // Confirm data
    if (!username || !songName || !score || !accuracy || !highCombo ) {
        return res.status(400).json({ message: 'All data not present' })
    }
    //verify user and song exist
    const user = await User.findOne({ username }).lean().exec()
    if (!user) {
        return res.status(409).json({ message: 'User not found' }) //user not found
    }
    const song = await Song.findOne({title: songName}).lean().exec()
    if (!song) {
        return res.status(400).json({ message: 'Song not found' }) //bad request, song not found
    }
    //create object to post
    const userObject = { user, song, score, accuracy, highCombo }
    // Create and store new stat for user 
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
    getSongUserStats,
    postStats
}