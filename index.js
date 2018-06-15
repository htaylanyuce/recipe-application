const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const passport = require('passport');
const mongoose = require('mongoose');
require('./models/users');
require('./services/passport')
const keys = require('./config/keys');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'))


mongoose.connect(keys.mongodb.mongoURI);

require('./routes/authGoogle')(app);
require('./routes/authFacebook')(app);

app.use(passport.initialize());

app.get('/',(req,res)=>{
  res.render('index');
});
app.get('/login',(req,res)=>{
  res.render('login');
});
app.get('/auth/google',
 passport.authenticate('google'));


const PORT = process.env.PORT || 5000;
app.listen(PORT);
