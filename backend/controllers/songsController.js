//imports
const Song = require('../models/Song')
//const asyncHandler = require('express-async-handler')
//const bcrypt = require('bcrypt')

// @desc Get all songs
// @route GET /songs
// @access Private (need authorization)
/*const getAllSongs = asyncHandler(async (req, res) => {
    // Get all users from MongoDB; -password does not return password, .lean=json data
    const songs = await Song.find()

    // If no songs 
    if (!songs?.length) {
        return res.status(400).json({ message: 'No songs found' })
    }

    res.json(songs)
})



module.exports = {
    getAllSongs
}*/

const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getSongs
}