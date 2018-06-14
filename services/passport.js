const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github').Strategy;
const mongoose = require('mongoose');
const Users = require('../models/users');
const keys = require('../config/keys');


passport.serializeUser(function(user, done) {
   done(null, user.id);
 });

 passport.deserializeUser(function(id, done) {
   User.findById(id,  (err, user) => {
     done(err, user);
   });
 });

passport.use(new FacebookStrategy({
    clientID: keys.facebook.facebookId,
    clientSecret: keys.facebook.facebookSecret,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    Users.findOne({userId:profile.id})
    .then((existingUser)=> {
      if(existingUser){
        done(null, existingUser);
      }
      else{
        new Users({userId:profile.id})
        .save()
        .then(user => done(null,user));

      }
    });

  }));
passport.use(new GitHubStrategy({
      clientID: keys.github.clientID,
      clientSecret: keys.github.clientSecret,
      callbackURL: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.id)
      Users.findOne({userId:profile.id})
      .then((existingUser)=> {
        if(existingUser){
          done(null, existingUser);
        }
        else{
          new Users({users:profile.id})
          .save()
          .then(user => done(null,user));

        }
      });

    }));
