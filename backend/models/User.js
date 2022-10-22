//import
const mongoose = require('mongoose')

//user data schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: "True"
    }
    //,
    // id: {
    //     type: String,
    //     required: "True"
    // }
})

module.exports = mongoose.model('User', userSchema)