//import
const allowedOrigins = require('./allowedOrigins')

//cors access - gives access to request resources from allowedOrigins list
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200 //http status code
}

module.exports = corsOptions 