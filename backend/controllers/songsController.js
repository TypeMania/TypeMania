//imports
const Song = require('../models/Song')

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