const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


module.exports = (app) => {
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
     res.redirect('/');
  });
}
