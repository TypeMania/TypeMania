//imports
const User = require('../models/User')
const Song = require('../models/Song')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private (need authorization)
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB; -password does not return password, .lean=json data
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, email } = req.body

    // Confirm data
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' }) //conflict
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) //10 salt rounds, keeps passwords secure in db

    const userObject = { username, "password": hashedPwd, email }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, email, password } = req.body

    // Confirm data 
    if (!id || !username || !email) {
        return res.status(400).json({ message: 'All fields except password are required' }) //bad request
    }

    // Does the user exist to update?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' }) //bad request
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).lean().exec()

    // Allow updates to the original user, avoid usr currently working with
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    user.username = username
    user.email = email

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10) // 10 salt rounds 
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.username} updated` })
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' }) //bad request
    }

    // Does the user still have assigned songs? -- will not delete if has custom songs uploaded
    const song = await Song.findOne({ user: id }).lean().exec()
    if (song) {
        return res.status(400).json({ message: 'User has assigned song' })
    }

    //does requested user exist
    const user = await User.findById(id).exec()

    //no matching user
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }

    //delete user
    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}