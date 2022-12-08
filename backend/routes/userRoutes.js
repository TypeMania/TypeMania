//imports
const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')


//regsiter new user route
router.route('/')
    .post(usersController.createNewUser)

//require auth
router.use(verifyJWT)

//not currently used by application
router.route('/')
    .get(usersController.getAllUsers)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)




module.exports = router