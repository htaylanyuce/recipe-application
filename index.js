const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
require('./models/author');
const Recipes = require('./models/recipes')
require('./services/passport')
const keys = require('./config/keys');
const random = require('mongoose-random');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));


mongoose.connect(keys.mongodb.mongoURI);

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(require('cookie-parser')());


app.use((req, res, next) => {
   res.locals.currentUser = req.user;
   next();
});


require('./routes/authFacebook')(app);
require('./routes/authGoogle')(app);
require('./routes/authRecipe')(app);
require('./routes/authGeneral')(app);


app.get('/',(req,res)=>{
  res.render('index');
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
