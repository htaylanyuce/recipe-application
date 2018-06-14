const passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = (app) => {
  app.get('/auth/github',  passport.authenticate('github'));

  app.get('/auth/github/callback',  passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
}
