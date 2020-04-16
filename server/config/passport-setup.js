const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const keys = require("./keys");
const User = require("../models/user-model");


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  
  new GitHubStrategy(
    {
      clientID: keys.GITHUB_CLIENT_ID,
      clientSecret: keys.GITHUB_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:4000/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        githubId: profile.id
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile.username,
          githubId: profile.id,
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
));