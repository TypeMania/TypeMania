//import
const mongoose = require('mongoose')

//song data schema
const songSchema = new mongoose.Schema({
    /*user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },*/
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    bpm: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    songFilePath: {
        type: String,
        required: true
    },
    songFile: {
        type: String,
        required: true
    }



})

module.exports = mongoose.model('Song', songSchema)