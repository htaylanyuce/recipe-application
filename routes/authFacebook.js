const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

let options = {
  successRedirect:'/show',
  failureRedirect:'/login'
}

module.exports = (app) => {

app.get('/auth/facebook',
    passport.authenticate('facebook', { scope: 'public_profile'}
));

app.get('/auth/facebook/callback', passport.authenticate('facebook', options));

}
