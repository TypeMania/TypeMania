//imports
const Song = require('../models/Song')

// @desc Get all users
// @route GET /users
// @access Private (need authorization)
const getAllSongs = async (req, res) => {
    // Get all songs from MongoDB;
    const songs = await Song.find()

    // If no songs
    if (!songs?.length) {
        return res.status(400).json({ message: 'No songs found' })
    }

    res.json(songs)
}

module.exports = {
    getAllSongs
}
 