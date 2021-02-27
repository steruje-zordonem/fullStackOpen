const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res, next) => {
    try {
        body = req.body

        // First check if the user already exist in the db
        const user = await User.findOne({ username: body.username })

        // Check if the password is correct
        const passwordCorrect = user === null
            ? false
            : await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        res.status(200).json({ token, username: user.username, id: user._id })

    } catch (exception) {
        next(exception)
    }
})

module.exports = loginRouter