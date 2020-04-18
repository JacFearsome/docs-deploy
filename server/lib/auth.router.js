const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require("../models/user-model");

// Setting up the passport middleware for each of the OAuth providers
const githubAuth = passport.authenticate('github', {scope: ["user","repo"]})

// Routes that are triggered by the callbacks from each OAuth provider once 
// the user has authenticated successfully
router.get('/github/callback', githubAuth, (req, res) => {
    const io = req.app.get('io')
    User.findOne({githubId: req.user.id}, (err, user) => {
      io.in(req.session.socketId).emit('github', req.user)
      io.in(req.session.socketId).emit('access', user.accessToken)
    });
    res.end()
})
// Routes that are triggered by the callbacks from each OAuth provider once 
// the user has authenticated successfully
// This custom middleware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right 
// socket
router.use((req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
})

// Routes that are triggered on the client
router.get('/github', githubAuth)

module.exports = router