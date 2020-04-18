const passport = require('passport')
const { Strategy: GithubStrategy} = require('passport-github2')
const { GITHUB_CONFIG } = require('../config')
const User = require("../models/user-model");

module.exports = () => {  

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))
  
  // The callback that is invoked when an OAuth provider sends back user 
  // information. Normally, you would save the user to the database 
  // in this callback and it would be customized for each provider
  const callback = (accessToken, refreshToken, profile, cb) => {
      User.findOneOrCreate({ githubId: profile.id }, { githubId: profile.id, username: profile.username, accessToken: accessToken }, function (err, user) {
        cb(null, profile)
      });
  }

  // Adding each OAuth provider's strategy to passport
  passport.use(new GithubStrategy(GITHUB_CONFIG, callback))
}