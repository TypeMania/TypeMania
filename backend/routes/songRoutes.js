const express = require('express')
const songsController = require('../controllers/songsController')

const router = express.Router()

//router.get('/songs', getSongs);
router.route('/songs')
    .get(songsController.getSongs)

module.exports = router