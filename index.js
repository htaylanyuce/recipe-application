const express = require('express');
const app = express();
const passport = require('passport');
const mongoose = require('mongoose');
//const keys = require('./config/keys');
require('./models/users');
require('./services/passport')
const keys = require('./config/keys');

mongoose.connect(keys.mongodb.mongoURI);

require('./routes/authGithub')(app);
require('./routes/authFacebook')(app);

app.use(passport.initialize());

app.get('/',(req,res)=>{
  res.send({hi:'there'})
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
