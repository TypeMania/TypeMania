//import
const mongoose = require('mongoose')
const Schema = mongoose.Schema


//statistic data schema
const statSchema = new mongoose.Schema({
    user: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    song:{
        type: [Schema.Types.ObjectId],
        ref: 'Song'
    },
    score: {
        type: Number,
    },
    accuracy: {
        type: Number
    },
    highCombo: {
        type: Number
    },
    
},
{timestamps: true,}
)

module.exports = mongoose.model('Stat', statSchema)