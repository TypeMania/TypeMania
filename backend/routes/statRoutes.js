//imports
const express = require('express')
const router = express.Router()
const statController = require('../controllers/statController')
const verifyJWT = require('../middleware/verifyJWT')


//get and post routes for User stats

//returns song stats per song for leaderboard
router.route('/songStats')
    .get(statController.getSongStats)
//returns specific song and user stats, not currently used in app
router.route('/songUserStats')
    .get(statController.getSongUserStats)
//returns all stats for specific user
router.route('/stats')
    .get(statController.getStats)
//post stats
router.route('/')
    .post(statController.postStats)








module.exports = router