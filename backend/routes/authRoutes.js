const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const loginLimiter = require('../middleware/loginLimiter')

//authroized routes and functionality
router.route('/')
    //public page posts to login
    .post(loginLimiter, authController.login)

router.route('/refresh')
    //authorized refresh route
    .get(authController.refresh)

router.route('/logout')
    //authroized logout route
    .post(authController.logout)

module.exports = router