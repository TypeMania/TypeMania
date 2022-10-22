//import
const mongoose = require('mongoose')

//statistic data schema
const statSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Song'
    },
    score: {
        type: Integer,
        required: true
    },
    errorPerc: {
        type: Integer,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Stat', statSchema)