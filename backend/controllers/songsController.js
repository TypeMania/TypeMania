//imports

//importing the Song module
const Song = require('../models/Song')

//getting songs from Database
const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//exporting the getsongs function
module.exports = {
    getSongs
}