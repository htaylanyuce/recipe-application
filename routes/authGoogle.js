const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

let options = {
  successRedirect:'/show',
  failureRedirect:'/login'
}

module.exports = (app) => {
  app.get('/auth/google',
   passport.authenticate('google', { scope : ['profile'] }));


    app.get('/auth/google/callback', passport.authenticate('google', options))

}
