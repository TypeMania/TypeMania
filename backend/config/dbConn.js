//import
const mongoose = require('mongoose')

//database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI) //constant in .env file
        console.log(process.env.DATABASE_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB