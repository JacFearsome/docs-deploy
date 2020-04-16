const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const keys = require("./keys");
const User = require("../models/user-model");

// serialize user
passport.serializeUser(function(user, done) {
  done(null, user);
});

// deserialize user
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// use GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:4000/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOneOrCreate({ githubId: profile.id, name: profile.username }, function (err, user) {
        return done(err, user);
      });
    }
));