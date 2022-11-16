//import
const mongoose = require('mongoose')

//song data schema
const songSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    artist: [{
        type: String,
        required: "True"
    }],
    bpm: {
        type: Number,
        required: "True"
    },
    length: {
        type: String,
        required: "True"
    },
    seed: {
        type: Array,
        required: "True"
    },
    songFilePath: {
        type: String,
        required: "True"
    },
    songFile: {
        type: String,
        required: "True"
    }



})

module.exports = mongoose.model('Song', songSchema)