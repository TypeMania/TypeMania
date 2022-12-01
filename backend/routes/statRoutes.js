//imports
const express = require('express')
const router = express.Router()
const statController = require('../controllers/statController')
const verifyJWT = require('../middleware/verifyJWT')



//require auth
// router.use(verifyJWT)

//get and post routes for User stats
router.route('/')
    .post(statController.postStats)
    .get(statController.getStats)
    .get(statController.getSongStats)






module.exports = router