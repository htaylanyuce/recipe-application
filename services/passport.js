const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const Author = require('../models/author');
const keys = require('../config/keys');

passport.serializeUser((user, done) =>{
   done(null, user.id);
 });

 passport.deserializeUser((id, done)=> {
   Author.findById(id,  (err, user) => {
     done(err, user);
   });
 });

passport.use(new FacebookStrategy({
    clientID: keys.facebook.facebookId,
    clientSecret: keys.facebook.facebookSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'picture', 'email']
   },
  (accessToken, refreshToken, profile, done) => {
    console.log(profile.id)
    console.log(profile.displayName)
    Author.findOne({authorId:profile.id,authorName:profile.displayName})
    .then((existingUser)=> {
      if(existingUser){
        done(null, existingUser);
      }
      else{
        new Author({authorId:profile.id,authorName:profile.displayName})
        .save()
        .then(user => done(null,user));

      }
    });

  }));

passport.use(new GoogleStrategy({
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      //console.log(profile);
      Author.findOne({authorId:profile.id,authorName:profile.name.givenName})
      .then((existingUser)=> {
        if(existingUser){
          done(null, existingUser);
        }
        else{
          new Author({authorId:profile.id,authorName:profile.name.givenName})
          .save()
          .then(user => done(null,user));

        }
      })
      .catch(function(err) {
       done(err);
     });

}));
